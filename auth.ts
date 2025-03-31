import { authConfig } from 'auth.config';
import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import { User } from '@/types/types';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google'

const sql = neon(`${process.env.DATABASE_URL}`);

const getUser = async (email: string) => {
  try {
    // Use parameterized query to prevent SQL injection
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    return user[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};


// handlers
// handlers are just route handlers => custom request handlers
// these handlers must be reexported from /api/auth/[...nextauth]/route.ts
// 


// this whole authentication logic can be shifted to a single route handler.
export const {handlers ,auth, signIn, signOut } = NextAuth({ 
  ...authConfig,
  providers: [
    // NextAuth.js handle the authentication automatically
    // 
    Credentials({
      async authorize(credentials) {
        // the logic used inside the provider and strategy is almost same
        // but the diffrence is how session is managed.
        // strategy is used manual session management.
        // while provider has automatic session management. => this is the main diffrence.
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          // if validation failed then safe parse will not throw an error.
          // .parse() will throw an error if validation failed.
          // {success: true, data: datas}; => this object has been returned.

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        console.log("invalid credentials");
        return null;
      },
    }),
    // the problem I faced that I didn't make the route
    // google redirect to redirect url after permissions. they are handled by route handlers.
    // https://next-auth.js.org/configuration/providers/oauth#how-to
    // the above link has complete illustration how to handle providers.
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // docs link for callbacks
  // https://next-auth.js.org/configuration/callbacks
  // Note: this callback run for all providers, even for credential prividers.
  // callbacks controlls the flow of signin.
  callbacks: {


    // signIn callback same as varify callback in passport.js,, 
    // it controls whether a user is allowed to sign in or not.
    // false => deny the access to login.
    // true => allow the access to login.
    // it will give finer control over login flow.


    async signIn({user, account, profile }) {
      
      // user
      // {
      //   "id": "12345",
      //   "name": "John Doe",
      //   "email": "johndoe@example.com",
      //   "image": "https://example.com/profile.jpg"
      // }

      // account
      // {
      //   "provider": "google",
      //   "type": "oauth",
      //   "access_token": "ya29.a0AfH6SM...",
      //   "expires_at": 1691234567,
      //   "refresh_token": "1//0g...",
      //   "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
      // }

      // profile
      // {
      //   "sub": "1234567890",
      //   "name": "John Doe",
      //   "given_name": "John",
      //   "family_name": "Doe",
      //   "picture": "https://example.com/profile.jpg",
      //   "email": "johndoe@example.com",
      //   "email_verified": true,
      //   "locale": "en"
      // }

      // this is how this callback work with credential providers
      if (account?.provider === "credentials") {
        if (user?.email) {
          return true;
        }
        // this is how this callback work with google provider.
      } else if (account?.provider === "google") {
        if (profile?.email_verified) {
          return true; // let access.
        } else {
          return false; //access denied
        }
      }

      // this is used for checking purpose
      // const isAllowedToSignIn = true;
      // if (isAllowedToSignIn) {
      //   return true;
      // }

      // default behavour => deny sign in.
      return false;  //=> access denied, you don't have permissoin to sing in


      // if a string is returns then that redirect to somewhere.
      // and redirect break the auth flow.
      // return "/";
    },
    // defining redirect logic after login or logout.
    // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
    // before it i need to define the redirectUrl inside the signIn methods but using redirect, I do not need it.
    // now I no more need to to define {redirectUrl: "/something"} in the signIn or signOut methods.
    // the redirect callback is called after signIn or signOut methods.
    // it will run more than once in authentication flow.
    async redirect({ url, baseUrl }) {
      // console.log(url);
      
      // baseurl => the root of the project that is in my case http://localhost:3000


      // url => this is where the nextjs want to redirect.
      // it's the callbackUrl from singIn method.
      // Note: this is the url that user is tried to access before login.

      // If the user is signing in, redirect to a specific page
      if (url.startsWith("/my-appointments")) {
        return url; // Redirect to the requested page
      }

      // Default redirect to the home page
      return baseUrl;
    },
    async jwt({token, account, profile}) {

      //token 
      // {
      //   "name": "John Doe",
      //   "email": "johndoe@example.com",
      //   "picture": "https://example.com/profile.jpg",
      //   "sub": "1234567890",
      //   "accessToken": "ya29.a0AfH6SM...",
      //   "id": "1234567890"
      // }

      // account
      // {
      //   "provider": "google",
      //   "type": "oauth",
      //   "access_token": "ya29.a0AfH6SM...",
      //   "expires_at": 1691234567,
      //   "refresh_token": "1//0g...",
      //   "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
      // }

      // profile
      // {
      //   "sub": "1234567890",
      //   "name": "John Doe",
      //   "given_name": "John",
      //   "family_name": "Doe",
      //   "picture": "https://example.com/profile.jpg",
      //   "email": "johndoe@example.com",
      //   "email_verified": true,
      //   "locale": "en"
      // }

      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub || profile?.id;
      }
      return token;
    },
    async session({ session, token}) {

      // here the fixes needed.
      // the types are extended in @/types/next-auth.d.ts
      // .d.ts mean these are typescript declaration file.
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;

      return session;
    }
  }
});

