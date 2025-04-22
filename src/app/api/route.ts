import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);


interface ApiResponse <T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}


// Catching
export const dynamic = 'force-static';

// Revalidation
export const revalidate = 60;

export async function GET(): Promise<NextResponse> {
  try {
    const data = await sql("SELECT * FROM doctors");
    return NextResponse.json({ success: true, data } as ApiResponse);
  } catch (error) {
    const err = error as Error;
      return NextResponse.json({success: false, error: err.message} as ApiResponse);
  }
}

