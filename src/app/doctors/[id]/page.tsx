// the nextjs route segement
"use client";
import Image from "next/image";
// import { doctors } from "@/assets/assets";
import { DoctorInfo } from "@/types/types";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { use, useContext } from "react";
import { AppContext } from "@/context/AppContext";
// import { getCldImageUrl } from "next-cloudinary";
import { doctorsImageUrl } from "@/library/imageurl";
import { DoctorWithIdSkelton } from "@/components/fallbacks/DoctorWithIdSkelton";

const dates = [
  {
    id: "08-03-2025",
    day: "Sat",
    date: 8,
  },
  {
    id: "09-03-2025",
    day: "Sun",
    date: 9,
  },
  {
    id: "10-03-2025",
    day: "Mon",
    date: 10,
  },
  {
    id: "11-03-2025",
    day: "Tue",
    date: 11,
  },
  {
    id: "12-03-2025",
    day: "Wed",
    date: 12,
  },
  {
    id: "13-03-2025",
    day: "Thr",
    date: 13,
  },
  {
    id: "14-03-2025",
    day: "Fri",
    date: 14,
  },
];

const slots = [
  {
    id: 1,
    time: "02:00 pm",
  },
  {
    id: 2,
    time: "02:30 pm",
  },
  {
    id: 3,
    time: "03:00 pm",
  },
  {
    id: 4,
    time: "03:30 pm",
  },
  {
    id: 5,
    time: "04:00 pm",
  },
  {
    id: 6,
    time: "04:30 pm",
  },
  {
    id: 7,
    time: "05:00 pm",
  },
  {
    id: 8,
    time: "05:30 pm",
  },
  {
    id: 9,
    time: "06:00 pm",
  },
  {
    id: 10,
    time: "06:30 pm",
  },
  {
    id: 11,
    time: "07:00 pm",
  },
  {
    id: 12,
    time: "07:30 pm",
  },
  {
    id: 13,
    time: "08:00 pm",
  },
];
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  // alternate way but this is asynchronous so only used in server components.
  // const { id } = await params;

  const { id } = use(params);
  const doctors = useContext(AppContext);
  if (!doctors) {
    return <DoctorWithIdSkelton />;
  }

  // filtering doctor with id.
  const filteredArray: DoctorInfo[] = doctors.filter(
    (doctor) => doctor._id === Number(id)
  );
  const doctorWithId: DoctorInfo = filteredArray[0];
  if (!doctorWithId) {
    return <div className="mt-32 ml-32 text-center">Doctor not found</div>;
  }

  // Doctor Image url
  const url = doctorsImageUrl(doctorWithId.image);

  return (
    
    <div className="wrapper ">
      <div className="flex flex-col sm:flex-row  gap-4 mt-20 ">
        {/* left container */}
        <div>
          {/* Image */}
          <div className="relative h-[350px] sm:h-64 sm:w-64 w-[350px]">
            {doctorWithId && (
              <Image
                src={url}
                alt="doctorimage.png"
                // height={256}
                // width={256}
                fill
                className="bg-blue-500 rounded-lg"
              />
            )}
          </div>

          {/* Experience */}
          <div className="flex gap-2 my-4 border rounded-lg  border-gray-300 px-4 py-2">
            <div className="font-bold">
              <FontAwesomeIcon icon={faCalendar} />
            </div>
            <div>
              <div className="font-bold">{doctorWithId.experience}</div>
              <div className="text-gray-500">Experience</div>
            </div>
          </div>

          {/* Fees */}
          <div className="flex gap-2 mb-4 border rounded-lg border-gray-300 px-4 py-2">
            <div className="font-bold">
              <FontAwesomeIcon icon={faIndianRupeeSign} />
            </div>
            <div>
              <div className="font-bold">{doctorWithId.fees}</div>
              <div className=" text-gray-500">Fees</div>
            </div>
          </div>
        </div>

        {/* right container */}
        <div className="">
          {/* About */}
          <div className="border border-gray-300 rounded-lg p-8">
            <div>
              <h1 className="font-medium text-3xl">{doctorWithId.name}</h1>
              <p className="text-gray-700 mt-1 mb-4">
                {doctorWithId.degree} - {doctorWithId.speciality}
              </p>
            </div>
            <div>
              <h1 className="font-medium">About</h1>
              <p className="mt mb-4 text-gray-700">{doctorWithId.about}</p>
            </div>
          </div>
          {/* Booking slots */}
          <div className="flex flex-col items-center">
            {/* Heading */}
            <h1 className="mt-8  text-gray-700 text-lg font-medium">
              Booking Slots
            </h1>

            {/* Dates */}
            <div className="flex flex-wrap justify-center gap-4 my-4">
              {dates.map((date) => {
                return (
                  <div
                    key={date.id}
                    className="border border-gray-500 rounded-full p-4 text-center w-20  "
                  >
                    <p>{date.day}</p>
                    <p>{date.date}</p>
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            <div className="flex  flex-wrap justify-center gap-4 ">
              {slots.map((slot) => {
                return (
                  <div
                    key={slot.id}
                    className="border border-gray-400 rounded-full py-1 w-28 text-center text-gray-400 text-sm"
                  >
                    {slot.time}
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <button className="border rounded-full py-2 px-8 sm:w-96 w-72 my-4 bg-blue-500 text-white mx-auto">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
