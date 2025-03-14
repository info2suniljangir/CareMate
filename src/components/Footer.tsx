import React from "react";
import Brand from "./Brand";
import Link from "next/link";




const Footer:React.FC = () => {
  return (
    <div className="wrapper flex flex-col items-center">
      <div className="flex flex-col sm:flex-row gap-14 text-base text-gray-600 px-16 mt-32">
        {/* Brand description */}
        <div className="sm:w-1/2 w-full">
          <Brand />
          <div className="w-full md:w-2/3 mt-5 leading-6">
            CareMate simplifies doctor appointments, connecting patients with
            healthcare professionals seamlessly. Book, manage, and track your
            consultations with ease.
          </div>
        </div>

        {/* Navigation */}
        <div className="sm:w-1/4 w-full ">
          <div className="font-medium text-xl  mb-7 text-black">Quick Links</div>
          <div className="flex flex-col gap-2">
            <Link href="#heroSection">Home</Link>
            <Link href="#speciality">Find by speciality</Link>
            <Link href="#topDoctors">Top doctors</Link>
            <Link href="#contactUs">Connect us</Link>
          </div>
        </div>
        {/* Contact Detail */}
        <div className=" ">
          <div className="font-medium text-xl mb-7 text-black">
            Get in touch
          </div>
          <div className="flex flex-col gap-2">
            <div>+0-000-000-000</div>
            <div>great*********@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[1px] bg-gray-200 mt-10 mb-6"></div>
      <div className="text-gray-500">© 2025 CareMate. All rights reserved.</div>
    </div>
  );
};

export default Footer;
