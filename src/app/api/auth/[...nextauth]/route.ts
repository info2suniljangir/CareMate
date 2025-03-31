

import { handlers } from "auth";


// after authentication, google redirects to the redirect url
// this route handlers detect that redirect routes.
// this way redirection from google handled.

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
export const { GET, POST } = handlers;


// for example after hitting the login button the request url will be 
// https://accounts.google.com/o/oauth2/auth?client_id=...


// and after giving permission the redirecting url will be
// http://localhost:3000/api/auth/callback/google?code=...

// so above one is handled by this route.
// if this route is not implemented, then how redirect form the profider will be handled.
