import Link from "next/link";
import Image from "next/image";
import { DoctorInfo } from "@/types/types";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// import { getCldImageUrl } from "next-cloudinary";
import { doctorsImageUrl } from "@/library/imageurl";

const DoctorCard1 = ({ doctor }: { doctor: DoctorInfo }) => {
  const url = doctorsImageUrl(doctor.image);
  return (
    <Link
      key={doctor._id}
      href={doctor._id.toString()}
      className=" cursor-pointer border border-gray-300 rounded-lg transition-all hover:translate-y-[-0.825rem] duration-500"
    >
      <div className="">
        <div className="">
          <Image
            src={url}
            alt="doctor's image"
            height={400}
            width={400}
            // on large screens size is smaller while on small screen size is larger.
            className=" w-80 h-80 md:w-56 md:h-56 rounded-t-lg object-cover bg-gray-50"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <div className="text-green-600">Available</div>
          <div className="font-medium">{doctor.name}</div>
          <div className="text-sm text-gray-600">{doctor.speciality}</div>
        </div>
      </div>
    </Link>
  );
};

const DoctorCard2 = ({ doctor }: { doctor: DoctorInfo }) => {
  const url = doctorsImageUrl(doctor.image);

  return (
    <div className="md:w-1/4 sm:w-2/3 sm:min-w-96 w-full rounded-md shadow-md profile-dropdown-shadow">
      <div className="flex  gap-4  rounded p-4">
        {/* Image div */}
        <div className="">
          <Image
            src={url}
            alt="doctor's image"
            height={400}
            width={400}
            // on large screens size is smaller while on small screen size is larger.
            className=" w-16 h-16  rounded-full object-cover bg-gray-50 m-2"
            loading="lazy"
          />
        </div>
        {/* Doctors Information div */}
        <div className="py-2">
          <div className="font-bold text-base">{doctor.name}</div>
          <div className="text-gray-500 font-medium text-sm mt-1 mb-4 flex gap-2 items-center">
            <span>{doctor.speciality}</span> <div className="separator"></div>{" "}
            <span>{doctor.degree}</span>
          </div>

          {/* Fees and experience */}
          <div className="flex gap-10 justify-between">
            <div className="flex gap-1">
              <FontAwesomeIcon
                icon={faCalendar}
                className="p-[6px] text-gray-700 text-xs"
              />
              <div>
                <div className="font-bold">{doctor.experience}</div>
                <div className="text-sm text-gray-500">Experience</div>
              </div>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon
                icon={faIndianRupeeSign}
                className="p-[6px] text-gray-700 text-xs"
              />
              <div>
                <div className="font-bold">{doctor.fees}</div>
                <div className="text-sm text-gray-500">Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action element */}
      <div className="flex mt-4">
        <div className="w-1/2 text-center text-gray-700 hover:bg-custom-pink border border-custom-pink rounded-bl p-2 transition-all duration-500">
          <Link href={`http://localhost:3000/doctors/${doctor._id}`}>
            View Profile
          </Link>
        </div>
        <div className="w-1/2 text-center bg-custom-pink hover:bg-white text-gray-700  border border-custom-pink rounded-br p-2 transition-all duration-500">
          <Link href={`http://localhost:3000/doctors/${doctor._id}`}>
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard1;
export { DoctorCard2 };
