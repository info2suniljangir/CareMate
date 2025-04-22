import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
const sql = neon(`${process.env.DATABASE_URL}`);


// DYNAMIC DATE KEYS
type SlotsBooked = {
  [date: string]: string[];
};


export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { userId, docId, slotDate, slotTime , userData} = req;

    if (!userId || !docId || !slotDate || !slotTime || !userData) {
      return NextResponse.json({ success: false, message: 'Missing required fields' });
    }
    
    const docData = await sql(`SELECT * FROM doctors WHERE _id = $1`, [docId]);

    const amount = docData[0].fees;
    
    if (!docData.length) {
      return NextResponse.json({ success: false, message: 'Doctor Not Available' });
    }    

    const slots_booked: SlotsBooked = await docData[0].slots_booked;

    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return NextResponse.json({success: false, message: "Slots not available"});
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    

    
    
    // inserting appointment data in to db
    await sql(`INSERT INTO appointments (user_id,
      doc_id,
      slot_date,
      slot_time,
      user_data,
      doc_data,
      amount,
      date) VALUES (
        $1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8)`, [
          userId,
          docId,
          slotDate,
          slotTime,
          userData, 
          docData[0],
          amount,
          Date.now()
        ]);

        // update slot in doctors table.
        await sql(`UPDATE doctors SET slots_booked = $1::jsonb WHERE _id = $2`, [
          JSON.stringify(slots_booked), 
          docId
        ]);

    return NextResponse.json({success: true, message: "Appointment booked"});
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({success: false, message: err.message});
    } else {
      console.log("Unknown Error: " + err);
    }

  }

}


