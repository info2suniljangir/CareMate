"use client";
import Image from "next/image";
import { useAuthContext } from "@/hooks/useAuthContext";
import React, { useCallback, useEffect, useState } from "react";
import { doctorsImageUrl } from "@/library/imageurl";
import { DoctorInfo } from "@/types/types";
import AppointmentCardSkeleton from "@/components/fallbacks/AppointmentCardSkelton";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/fallbacks/LoadingSpinner";

export interface UserDataType {
  id: string;
  email: string;
  name: string;
  imgage: string;
}

// CHANGING ADDRESS TYPE FROM DoctorInfo
export type UpdatedDocInfo = Omit<DoctorInfo, "address"> & {
  address: {
    line1: string;
    line2: string;
  };
};

export interface MyAppointmentType {
  id: number;
  user_id: string;
  doc_id: string;
  amount: string;
  cancelled: boolean;
  is_completed: boolean;
  payment: boolean;
  date: string; // e.g., timestamp as string like "1745118041473"
  slot_date: string; // e.g., "20_4_2025"
  slot_time: string; // e.g., "12:00 PM"
  user_data: UserDataType;
  doc_data: UpdatedDocInfo;
}

const Page = () => {
  const user = useAuthContext();
  const [myAppointments, setMyAppointments] = useState<
    MyAppointmentType[] | undefined | null
  >(null);
  const [cancelPendingId, setCancelPendingId] = useState<number | null>();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // GETTING USER APPOINTMENT
  const getUserAppointments = useCallback( async () => {
    try {
      const response = await fetch("/api/user/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const userAppointments = await response.json();
      if (userAppointments.success) {
        setMyAppointments(userAppointments.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);


  // CANCELLING APPOINTMENT BY USER
  const cancelAppointment = async (appointmentId: number, userId: string) => {
    setCancelPendingId(appointmentId);
    try {
      const response = await fetch("/api/user/cancel-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, userId }),
      });
      const cancelResponse = await response.json();
      if (cancelResponse.success) {
        toast.success(cancelResponse.message);
        getUserAppointments();
      } else {
        toast.error(cancelResponse.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Appointment is not cancelled");
    } finally {
      setTimeout(() => {
        setCancelPendingId(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [getUserAppointments]);

  // PROVIDING FALLBACK UI
  if (!myAppointments) {
    return <AppointmentCardSkeleton />;
  }

  // WHEN NO APPOINTMENT IS BOOKED
  if (myAppointments.length === 0) {
    return (
      <div className="mx-auto mt-32 max-w-7xl text-center">
        No appointment available
      </div>
    )
  }

  return (
    <div className="mx-auto mt-32 max-w-7xl ">
      {myAppointments &&
        myAppointments.map((element) => {
          const url = doctorsImageUrl(element.doc_data.image);
          const [date, month, year] = element.slot_date.split("_");

          return (
            <div
              key={element.id}
              className=" flex justify-between flex-col sm:flex-row  border-t border-b border-t-gray-300 border-b-gray-300 py-5 px-5 md:px-0"
            >
              {/* left */}
              <div className="flex gap-4">
                <div>
                  <Image
                    src={url}
                    alt="dummyImage"
                    height={150}
                    width={150}
                    className="rounded"
                  />
                </div>

                <div>
                  <div className="font-bold">{element.doc_data.name}</div>
                  <div className="text-sm text-gray-700">
                    {element.doc_data.speciality}
                  </div>
                  <div className="font-medium mt-1 text-gray-700">
                    Address:{" "}
                  </div>
                  <div className="text-sm text-gray-700">
                    {element.doc_data.address.line1}
                  </div>
                  <div className="text-sm text-gray-700">
                    {element.doc_data.address.line2}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium">Date & Time :&nbsp;</span>
                    <span className="text-sm text-gray-700">
                      <span>{date} &nbsp;</span>
                      <span>{monthNames[Number(month) - 1]} &nbsp;</span>
                      <span>{year} &nbsp;</span>|&nbsp;
                    </span>
                    <span className="text-sm text-gray-700">
                      {element.slot_time}
                    </span>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="flex flex-col gap-4 text-sm justify-end mt-5 sm:mt-0">
                {/* <button className="border border-gray-300 rounded px-4 py-1">
                  Pay Online
                </button> */}

                {cancelPendingId === element.id ? (
                  <LoadingSpinner />
                ) : (
                  <button
                    disabled={element.cancelled}
                    onClick={() =>
                      cancelAppointment(element.id, element.user_id)
                    }
                    className={`border ${
                      element.cancelled
                        ? "border-red-600 text-red-600"
                        : "border-gray-300 text-gray-700"
                    } border-gray-300 rounded px-6 py-2`}
                  >
                    {element.cancelled
                      ? "Appointment cancelled"
                      : "Cancel appointment"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Page;
