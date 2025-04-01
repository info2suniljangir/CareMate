"use server";

import { auth, signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

const sql = neon(`${process.env.DATABASE_URL}`);
// ...



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
    // note the next redirect error must be fixed.
    if (error instanceof AuthError) {
      return "Something went wront."
    }
    throw error;
  }
}


export async function registerUser(
  prevState: string | undefined,
  formData: FormData
) {
  // to align it with useActionState state, the returned state must be string, not an object.
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
    throw error;

    // Question 2: throwing error solved but still in the url shows signin.
    // this is because callback url must be supplied to the signIn method.
    // in this scenario callback url supplied from the form data.

    // Question 1: why this throwing error solved redirect error?
    // throw statement
    // used to throw user defined exception.
    // throw statement, terminates the program and give the controll to the next catch block.
    // if there is no catch block then programe terminates.
    // Means throw statement is used to termination programe immediately.
    // used to handle unexpected exceptions.
    // The throw statement only stops execution and passes the error to the nearest catch block.
    //  It does not directly show the error to the user.
    // If you want to display an error to the user, you must handle it explicitly.
  }
}

export async function logOut() {
  await signOut();
}
