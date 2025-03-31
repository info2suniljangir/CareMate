import { neon } from "@neondatabase/serverless";
const sql = neon(`${process.env.DATABASE_URL}`);
import { doctors } from "@/assets/assets";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await sql(
          "CREATE TABLE IF NOT EXISTS doctors ( _id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, image VARCHAR(255), speciality VARCHAR(255), degree VARCHAR(255), experience VARCHAR(50), about TEXT, fees INT NOT NULL CHECK (fees >= 0), address JSONB)"
        );
      
        await Promise.all(
          doctors.map(async (item) => {
            await sql(
              `INSERT INTO doctors (name, image, speciality, degree, experience, about, fees, address) VALUES ($1, $2, $3, $4,$5, $6, $7, $8)`,
              [
                // item._id,
                item.name,
                item.image,
                item.speciality,
                item.degree,
                item.experience,
                item.about,
                item.fees,
                item.address,
              ]
            );
          })
        );
      
        return NextResponse.json({message: "data seeded successfully"});
        
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({error: err.message}, {status: 500});
        
    }
}

// search localhost:3000/api/seeddata
// this will seed the database.
// {"message":"data seeded successfully"} this message will show on successfull seeding.
