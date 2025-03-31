
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";


const sql = neon(`${process.env.DATABASE_URL}`);

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
}


export async function GET(): Promise<NextResponse> {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                _id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20) DEFAULT '000000000',
                address JSONB DEFAULT '{"line1": "", "line2": ""}',
                gender VARCHAR(50) DEFAULT 'Not Selected',
                dob VARCHAR(50) DEFAULT 'Not Selected',
                password TEXT NOT NULL
            )
        `;

        return NextResponse.json({ success: true, message: "Table created successfully" } as ApiResponse);
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message } as ApiResponse);
    }
}