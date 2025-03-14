import Image from "next/image";
import React from "react";
import { assets } from "@/assets/assets";

//  If you have a layout.tsx, Next.js will wrap the Page component inside it automatically.
// Maintain consistency
// Next.js conventions.
const Page: React.FC = () => {
  return (
    <div className="wrapper  ">
      <div className="flex flex-col md:flex-row gap-4 mt-16 sm:mt-20 md:mt-16  md:p-6 sm:w-[80%] mx-auto">
        {/* Left container */}
        <div className="md:w-1/2  w-full shadow-md rounded-md p-5">
          {/* about */}
          <div className="">
            <h1 className="font-medium text-xl ">About Us</h1>
            <p className="text-sm text-gray-500 mt-4">
              At CareMate, we prioritize convenience, efficiency, and
              accessibility. Whether you need a routine check-up or specialized
              medical consultation, our platform ensures a hassle-free booking
              experience, so you can focus on what truly matters—your health.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              With a commitment to innovation in healthcare technology, CareMate
              continually enhances its platform to provide a smooth,
              user-friendly experience. From finding the right doctor to
              securing your appointment in just a few taps, we’re here to
              support you every step of the way.
            </p>
          </div>
          {/* Vision */}
          <div className="mt-8">
            <h3 className="text-base font-normal">Our Vision</h3>
            <p className="text-sm text-gray-500 mt-2">
              To revolutionize healthcare accessibility by providing a seamless,
              efficient, and user-friendly platform for booking doctor
              appointments. CareMate envisions a future where everyone can
              connect with trusted healthcare professionals effortlessly,
              ensuring timely care and improved well-being for all.
            </p>
          </div>
        </div>

        {/* right container */}
        <div className="shadow-lg rounded-md">
          {/*1. Next.js <Image> component does not automatically stretch to fill its container. 
            If the image is smaller than the container, it leaves blank space to the right. 
            2. Image must be always inside the container to controll the rendered size of the image.
            */}
            
          {/* <Image
            src={assets.aboutImage2}
            alt="aboutImage"
            width={500}
            height={200}
            // fill
            className="w-[600px] md:w-[500px] rounded-t"
          /> */}

          {/* this is the best way to use image. */}
          <div className="relative w-full h-[300px]">
            <Image
              src={assets.aboutImage2}
              alt="aboutImage"
            //   either fill or hight and width property given
              fill
            //   three things comes with fill
            // 1, set position relative to the parent container,
            // 2, Image container must be responsive
            // 3, object fit cover or contain must be supplied in to the style
              className="object-cover rounded-t"
            //   1. contain: image will be squezed or stressed to fit the container to preserve aspect ratio.
            // 2. Image will be squezed or stressed to fit the container and cropped to preserve aspect ratio.
              priority
            />
          </div>
          <div className="flex justify-center gap-4 flex-wrap py-4 mx-auto p-5">
            <div className=" bg-gray-50 px-3 py-2 w-5/12  rounded">
              <h2 className="font-bold">10+</h2>
              <div className="text-gray-500 text-sm">
                Year&apos;s of experience
              </div>
            </div>
            <div className=" bg-gray-50 px-3 py-2 w-5/12 rounded">
              <h2 className="font-bold">50k+</h2>
              <div className="text-gray-500 text-sm">Happy Patient</div>
            </div>
            <div className=" bg-gray-50 px-3 py-2 w-5/12 rounded">
              <h2 className="font-bold">100+</h2>
              <div className="text-gray-500 text-sm">Doctors</div>
            </div>
            <div className="w-5/12 bg-gray-50 px-3 py-2 rounded">
              <h2 className="font-bold">98%</h2>
              <div className="text-gray-500 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
