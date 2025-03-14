import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { specialityData } from "@/assets/assets";
import Link from "next/link";




const SpecialityMenu:React.FC = () => {
  return (
    <div className="wrapper" id="speciality">
      <div className="py-16">
        <div className="flex flex-col gap-4 items-center my-10">
          <div className="text-3xl font-medium ">Find by Speciality</div>
          <p className="text-sm text-center sm:w-1/3">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free..
          </p>
        </div>
        <div className="flex sm:justify-center overflow-scroll no-scrollbar py-5 gap-4 text-gray-600">
          {specialityData.map((speciality) => {
            return (
              <Link key={speciality.speciality} href={`/doctors/specialist/${speciality.speciality}`}>
              <div
                key={speciality.speciality}
                className="cursor-pointer text-center hover:text-custom-red hover:translate-y-[-.5rem] transition-all duration-700 ease-out "
              >
                <FontAwesomeIcon icon={speciality.image} className="text-3xl" />
                <div className="text-xs my-2">{speciality.speciality}</div>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
