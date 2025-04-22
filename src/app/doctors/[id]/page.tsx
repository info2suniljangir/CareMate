// the nextjs route segement
"use client";
import Image from "next/image";
import { DoctorInfo } from "@/types/types";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { use, useCallback, useEffect, useState } from "react";
import { doctorsImageUrl } from "@/library/imageurl";
import { DoctorWithIdSkelton } from "@/components/fallbacks/DoctorWithIdSkelton";
import { toast } from "react-toastify";
import { useAppContext, useAuthContext } from "@/hooks/useAuthContext";
import {  useRouter } from "next/navigation";
export interface TimeSlots {
  dateTime: Date, 
  time: string
};

export interface AllSlots {
  dateKey: string,
  slots: TimeSlots[]
};

interface AvailableSlots {
  [key: string]: string[];
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {

  const [docSlots, setDocSlots] = useState<AllSlots[]>([]);
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string | null>(null);
  const [docInfo, setDocInfo] = useState<DoctorInfo | null | undefined>(null);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const { id } = use(params);
  const user = useAuthContext();
  const router = useRouter();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  
  const userId = user && user.user.id;
  const userData = user && user.user;
  const docId = Number(id);
  
  
  const {doctors, getDoctorsData} = useAppContext();
  const fetchDoctorsInfo = useCallback((docId: number) => {
    const doctorInfo = doctors?.find((doc) => doc._id === docId);
    setDocInfo(doctorInfo);
  },[doctors]);
  
  // getting only available slots
  const getAvailableSlots = useCallback(() => {
    const today = new Date();
    const allSlots: AllSlots[] = [];
    
    
    for (let i = 0; i<7; i++) {
      
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      
      const dateKey = currentDate.toISOString().split("T")[0];
      
      // END TIME FOR EACH DAY
      const endTime = new Date();
      endTime.setDate(currentDate.getDate());
      endTime.setHours(21, 0, 0, 0); //it's 9:00 pm
      
      // START TIME FOR EACH DAY
      if (currentDate.getDate() === today.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      
      const timeSlots: TimeSlots[] = [];
      while (currentDate < endTime) {
        
        const formatedTime = currentDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
        
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear();
        
        const slotDate = `${day}_${month}_${year}`;
        
        const slotsBooked = docInfo?.slots_booked as AvailableSlots | undefined;
        const isSlotAvailable = !slotsBooked?.[slotDate]?.includes(formatedTime);
        
        // SHOWING ONLY AVAILABLE SLOTS
        if(isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formatedTime,
          })
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push({ dateKey: dateKey ,slots: timeSlots});
  
    }
    setDocSlots(allSlots);
  },[docInfo?.slots_booked])

  useEffect(() => {
    if (doctors) {
      fetchDoctorsInfo(docId);
    }

  },[doctors, docId, fetchDoctorsInfo]);

useEffect(() => {
  if (docInfo) {
    getAvailableSlots();
  }
}, [docInfo, getAvailableSlots]);


// booking of appointment
const bookAppointment = async () => {
  setIsBooking(true);
  if (!user) {
    toast.warning("Login to book appointment");
    router.push("/login");
  }


  const date = docSlots[slotIndex].slots[0]?.dateTime;

        const day = date?.getDate()
        const month = date?.getMonth() + 1
        const year = date?.getFullYear()

        const slotDate = day + "_" + month + "_" + year

  try {
    const response = await fetch("/api/user/book-appointment", {
      method: "POST",
      body: JSON.stringify({
        userId,
        docId,
        slotDate,
        slotTime,
        userData
      }),
      headers: {
        "Content-Type": "application/json",

      }
    })
    const data = await response.json();
    if (response.ok && data.success) {
      toast.success(data.message);
      // UPDATE THE DATA IN THE CONTEXT
      getDoctorsData();
      router.push(`/my-appointments`);
      setIsBooking(false);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log("error occurred in booking appointment: "+ error);
  } 
}



  // PROVIDING FALLBACK UI
  if (!doctors) {
    return <DoctorWithIdSkelton />;
  }

  // filtering doctor with id.
  const filteredArray: DoctorInfo[] = doctors?.filter(
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
              {docSlots.length && docSlots.map((date, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
                    onClick={() => {
                      setSlotIndex(itemIndex)
                      setSlotTime("");
                    }}
                    className={`border border-gray-500 rounded-full p-4 text-center w-20 cursor-pointer ${itemIndex === slotIndex ? 'bg-blue-500 text-white' : 'border border-[#DDDDDD]'} ${date.slots[0] ? "visible" : "hidden"}`}
                  >
                    <p>{date.slots && weekDays[date.slots[0]?.dateTime.getDay()]}</p>
                    <p>{date.slots && date.slots[0]?.dateTime.getDate()}</p>
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            <div className="flex  flex-wrap justify-center gap-4 ">
              {docSlots.length && docSlots[slotIndex].slots.map((slot, index) => {
                return (
                  <div
                    key={index}
                    className={`border border-gray-400 rounded-full py-1 w-28 text-center text-gray-400 text-sm cursor-pointer ${slot.time === slotTime ? 'bg-blue-500 text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
                    onClick={() => setSlotTime(slot.time)}
                  >
                    {slot.time}
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <button 
            disabled={isBooking}
            className={`border rounded-full py-2 px-8 sm:w-96 w-72 my-4  mx-auto text-white ${isBooking ? 'bg-blue-100' : 'bg-blue-500'}`}
            onClick={bookAppointment}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
