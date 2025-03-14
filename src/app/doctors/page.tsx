"use client";
import React, { useContext, useState } from "react";
// import style from "./Doctors.module.css"
// before doctors was imported from the following assets file, but no I am reading/subscribing it from context.
import { specialityData } from "@/assets/assets";
import { DoctorCard2 } from "@/components/DoctorCard";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";

// ${style.addtransition}


const Page = () => {
  const [chooseSpeciality, setChooseSpeciality] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const doctors = useContext(AppContext);
  // the doctors can be null, so in that case optional chaining operator can be used to access data

  //  use effect is not used here because filtering doctor is pure computation
  // it's not an side effect means it's not something that tapping outside of the react.
  // and react suggest that do not use effect, if it has not side effect.
  // this is pure calculation so can be performed during rendering.
  const filteredDoctors = doctors?.filter((doctor) => {
    if (chooseSpeciality === "all") {
      return true;
    } else if (chooseSpeciality === doctor.speciality) {
      return true;
    }
  });

  const filterOnSearch = doctors?.filter((doctor) => {
    if (search.trim() !== "") {
      return doctor.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  return (
    <div className="wrapper">
      {/* Main container */}
      <div className="mt-16 sm:mt-20 md:mt-16">
        {/* filter container */}
        <div className="flex items-center gap-4 flex-col md:flex-row justify-between md:m-6   py-4">
          {/* input contaienr */}
          <div className="md:w-1/3 w-full sm:w-2/3">
            <div className=" flex  border border-gray-300 py-2 px-3 rounded-md ">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor with name"
                className="outline-none w-[95%] text-gray-900"
              />
              <button className="r">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
              </button>
            </div>
            {/* Search Menu*/}
            <div className="relative">
              {/* overflow auto will add the scrollbar when necessary, in this case when max height is greater than 288 px */}
              <ul className="absolute top-0 shadow-md rounded w-full bg-white max-h-72 overflow-y-auto">
                {filterOnSearch?.map((doctor) => {
                  return (
                    <li
                      key={doctor._id}
                    >
                      <Link href={`/doctors/${doctor._id}`} className="px-4 py-3 border-t border-t-gray-100 block">
                      {doctor.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/*  */}
          <select
            value={chooseSpeciality}
            onChange={(e) => setChooseSpeciality(e.target.value)}
            name="selectedSpeciality"
            id="selectedSpeciality"
            className="outline-none border border-gray-300 py-2 px-3 rounded-md "
          >
            <option value="all">Filter by speciality</option>
            {specialityData.map((currentElement) => {
              return (
                <option
                  key={currentElement.speciality}
                  value={currentElement.speciality}
                >
                  {" "}
                  {currentElement.speciality}
                </option>
              );
            })}
          </select>
        </div>
        {/* card container */}
        <div className="flex justify-center flex-wrap gap-5">
          {/* Filtering the doctors */}
          {filteredDoctors?.map((doctor) => {
            return <DoctorCard2 key={doctor._id} doctor={doctor} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
