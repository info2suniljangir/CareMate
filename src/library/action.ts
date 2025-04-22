"use server";

import { auth, signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

const sql = neon(`${process.env.DATABASE_URL}`);

// giving default value of auth.
export const getAuthContext = async () => {
  const session = await auth();
  return session;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}


export const signInWithGoogle = async () => {
  try {
    await signIn("google");
    
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wront."
    }
    // FIXING NEXT REDIRECT ERROR
    throw error;
  }
}


export async function registerUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!name || !email || !password) {
      return "All fields are required";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (existingUser.length > 0) {
      return "User already exists";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
        INSERT INTO users (name, email, password) 
        VALUES (${name}, ${email}, ${hashedPassword})
      `;

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    // NEXT AUTH REDIRECT ERROR FIXED
    throw error;
  }
}

export async function logOut() {
  await signOut();
}
