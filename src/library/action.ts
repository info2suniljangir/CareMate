"use server";
import { z } from "zod";

import { auth, signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const sql = neon(`${process.env.DATABASE_URL}`);

// giving default value of auth.
export const getAuthContext = async () => {
  const session = await auth();
  return session;
}

// CONTACT FORM SUBMISSION
export async function submitContactForm (
  prevState: string | undefined,
  formData: FormData,
) {
  // Validate input data using zod.
  const contactFormSchema = z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name must be at most 30 characters"),
  
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name must be at most 30 characters"),
  
      email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .min(6, "Email must be at least 6 characters")
      .max(50, "Email must be at most 50 characters")
      .refine((val) => val.endsWith("@gmail.com"), {
        message: "Only Gmail addresses are allowed",
      }),
  
    mobile: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  
    message: z
      .string()
      .trim()
      .min(50, "Message must be at least 50 characters")
      .max(1000, "Message must be less than 1000 characters"),
  });
  const rawData = {
    firstName: formData.get("fName"),
    lastName: formData.get("lName"),
    email: formData.get("email"),
    mobile: formData.get("mobileNumber"),
    message: formData.get("message"),
  };
  const result = contactFormSchema.safeParse(rawData);
  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message).join(", ");
    return errorMessages;
  }
  const { firstName, lastName, email, mobile, message } = result.data;

  if (!firstName || !lastName || !email || !mobile || !message) {
    return "All fields are required.";
  }

  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });


    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Mobile: ${mobile}
        Message:${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return "Form submitted successfully.";
  } catch (error) {
    if (error instanceof Error) {
      return "Form is not submitted! Please try again."
    }
    console.log("Some error occured while submitting contact form.")
    return 'Something wrong with form submission.'
    
  }

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
    

    

  const signupFormSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 255 characters"),

    email: z
      .string()
      .trim()
      .min(10, "Email must be at least 10 characters")
      .max(100, "Email must be less than 100 characters")
      .email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
      
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });


    // optional for password security
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   "Password must include uppercase, lowercase, number, and special character"
    // ),
    

  const rawData = {
    fullName : formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    }
  
  const result = signupFormSchema.safeParse(rawData);

  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message).join(", ");
    return errorMessages;
  }


  const {fullName: name, email, password, confirmPassword} = result.data;

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
