


import React from "react";
import ContactUs from "@/components/ContactUs";
const Page= () => {
  return (
    <div className="mt-16 sm:mt-20 md:mt-16 flex flex-col gap-10">
      <ContactUs />

        {/*Contact cards */}
      <div className="flex justify-between w-[80%] border border-gray-300 rounded wrapper">
        <div>
            <h1 className="font-medium">Address</h1>
            <p className="text-sm text-gray-500">XXXXX-XXXXX</p>
            <p className="text-sm text-gray-500">Jaipur, India</p>
        </div>
        <div>
            <h1 className="font-medium">Tel</h1>
            <p className="text-sm text-gray-500">+9999999999</p>
        </div>
        <div>
            <h1 className="font-medium">Email</h1>
            <p className="text-sm text-gray-500">caremate@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Page;