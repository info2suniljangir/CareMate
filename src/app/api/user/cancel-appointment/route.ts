import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST (request: Request) {
    try {
        const {appointmentId, userId} = await request.json();


        const  selectedAppointment = await sql("SELECT * FROM appointments WHERE id = $1", [appointmentId]);

        if (selectedAppointment[0].user_id !== userId) {
            console.log("unauthorized action");
            return NextResponse.json({success: false, message: "Unauthorized action"});
        }

        await sql('UPDATE appointments SET cancelled = $1 WHERE id = $2', [true, appointmentId]);

        const {doc_id, slot_date, slot_time} = selectedAppointment[0];

        const docData = await sql('SELECT slots_booked FROM doctors WHERE _id = $1', [doc_id]);
        const {slots_booked} = docData[0];

        // Remove the slot 
        const updatedSlots = { ...slots_booked };
        if (updatedSlots[slot_date]) {
            updatedSlots[slot_date] = updatedSlots[slot_date].filter((time: string) => time !== slot_time);

            // Optional: delete the date key if the array is now empty
            // if (updatedSlots[slot_date].length === 0) {
            //     delete updatedSlots[slot_date];
            // }
        }

        await sql("UPDATE doctors SET slots_booked = $1 WHERE _id = $2", [updatedSlots, doc_id]);

        return NextResponse.json({ success: true, message: "Appointment cancelled successfully." });
        
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({success: true, message: "Something went wrong"});
        }
        console.log("Error cancelling appointment");
    }
}