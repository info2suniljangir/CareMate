"use client";
import React, { useContext } from "react";
// import { doctors } from "@/assets/assets";
// insted of getting data from assets, I made an context, a global store to store data. that is a context.
import { DoctorCard2 } from "./DoctorCard";
import { AppContext } from "@/context/AppContext";
// import { getData } from "@/library/action";
import { TopDoctorsSkeleton } from "./fallbacks/TopDoctorsSkelton";


const TopDoctors: React.FC = () => {
  const doctors = useContext(AppContext);

  if (!doctors) {
    return <TopDoctorsSkeleton />;
  }


  // Response.json()
  // The json() method of the Response interface takes a Response stream and reads it to completion.
  // It returns a promise which resolves with the result of parsing the body text as JSON.
  // Note that despite the method being named json(), the result is not JSON but is instead
  // the result of taking JSON as input and parsing it to produce a JavaScript object.

  // Returns
  // A Promise that resolves to a JavaScript object. This object could be anything
  // that can be represented by JSON — an object, an array, a string, a number…

  return (
    <div className="wrapper flex flex-col items-center" id="topDoctors">
      <div className="font-medium text-2xl text-center ">Our Top Doctors</div>
      <div className="text-center my-4 sm:w-1/3">
        Simply browse through our extensive list of trusted doctors.
      </div>
      <div className="flex justify-center gap-5  flex-wrap my-10">
        {doctors?.slice(0, 12).map((doctor) => {
          return (
            // <DoctorCard1 key={doctor._id} doctor={doctor}/>
            <DoctorCard2 key={doctor._id} doctor={doctor} />
          );
        })}
      </div>
    </div>
  );
};

export default TopDoctors;
