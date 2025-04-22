import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
const sql = neon(`${process.env.DATABASE_URL}`);




export async function POST (request: Request) {
    try {
        const req = await request.json();
        const userId = req.user.id;

        const userAppointments = await sql("SELECT * FROM appointments WHERE user_id = $1", [userId]);
        
        return NextResponse.json({success: true, appointments : userAppointments});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({success: false, message: error.message})
        }
        return NextResponse.json({success: false, message: "something went wrong"});
    }
}