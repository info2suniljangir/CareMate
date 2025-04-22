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
  console.log("fetching user frm email: "+ email);
  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    return user[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};

export const {handlers ,auth, signIn, signOut } = NextAuth({ 
  ...authConfig,
  providers: [
    // 
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          };
        }
        console.log("invalid credentials");
        return null;
      },
    }),

    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {

    async signIn({user, account, profile }) {
      
     

      if (account?.provider === "credentials") {
        if (user?.email) {
          return true;
        }
      } else if (account?.provider === "google") {
        if (profile?.email_verified) {
          return true; // let access.
        } else {
          return false; //access denied
        }
      }

      return false; 

    },
    
    async redirect({ url, baseUrl }) {
    
      return baseUrl;
    },
    async jwt({token, user,account, profile}) {
     
      
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.id = profile?.sub || profile?.id || user.id;
      }

      if (account?.provider === "credentials") {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token}) {
     

      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      // console.log(session);

      return session;
    }
  }
});

