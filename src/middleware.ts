

import NextAuth from 'next-auth';
import { authConfig } from "../auth.config";
 
export default NextAuth(authConfig).auth;


// RUN MIDDLEWARE ON SPECIFIC ROUTES
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', "/my-appointments"], 

};