

import type { NextAuthConfig } from 'next-auth';


// note this is a configuration object only. we are not calling auth here.
// Means this is setting only.


// main use of middleware in authentication is to protecting the routes.
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
//   callbacks are the asynchronous functions that tells waht happen when  a specific action performed.
// protecting the routes.
// in nextjs callback are used to handle proctect routes.
// in strategies passport.authenticate() middleware is used to protect routes.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnMyAppointment = nextUrl.pathname.startsWith('/my-appointments');
      if (isOnMyAppointment) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/my-appointments', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now to match type.
} satisfies NextAuthConfig;

// this is a bug i have to fix.
// If the user is already logged in and tries to access a non-protected page, they are redirected to /my-appointments.