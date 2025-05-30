"use client";
import React, {  } from "react";
// import { doctors } from "@/assets/assets";
// insted of getting data from assets, I made an context, a global store to store data. that is a context.
import { DoctorCard2 } from "./DoctorCard";
// import { getData } from "@/library/action";
import { TopDoctorsSkeleton } from "./fallbacks/TopDoctorsSkelton";
import { useAppContext } from "@/hooks/useAuthContext";


const TopDoctors: React.FC = () => {


  const {doctors} = useAppContext();
  
  if (!doctors) {
    return <TopDoctorsSkeleton />;
  }

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
