"use client";
// import { assets } from "@/assets/assets";
// import { getCldImageUrl } from "next-cloudinary";
import { heroImageUrl } from "@/library/imageurl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {



  // const heroImageUrl = getCldImageUrl({
  //   width: 1200,
  //   height: 1200,
  //   src: "seed-images/hero",
  // });
  return (
    // Gradient background using tailwindcss=>Gradual change of color from top to bottom from blue to white
    <div
      className="wrapper flex justify-center bg-gradient-to-b from-blue-50 to-white"
      id="heroSection"
    >
      <div className="flex flex-col md:flex-row  items-center md:max-w-[80%] max-w-[90%] mt-24 md:mt-10">
        <div className="md:w-1/2 text-center md:text-left">
          <div className="font-extrabold text-4xl md:text-5xl leading-tight">
            Get Your <span className="text-custom-red"> Appointment</span>{" "}
            <br /> Fast & Easy
          </div>
          <div className="text-lg text-gray-600 my-4 leading-relaxed">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </div>
          <Link href="/doctors">
            <button className="text-white font-semibold bg-custom-red border rounded px-4 py-3 hover:bg-white hover:text-custom-red  hover:border-custom-red transition-all duration-500">
              Book Appointment
            </button>
          </Link>
          {/* Datas */}
          <div className="flex mt-4 gap-5 text-center text-gray-500 justify-center md:justify-start">
            <div>
              <div className="font-bold">100+</div>
              <div>Doctors</div>
            </div>
            <div>
              <div className="font-bold">50k+</div>
              <div>Happy Patient</div>
            </div>
            <div>
              <div className="font-bold">98%</div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="md:w-1/2">
          {/* the rendered size of the image is controlled by this parent element. */}
          <Image
            src={heroImageUrl}
            alt="hero.png"
            // if the fill property is used then height and width mean intrinsic size of the image should not be specified.
            // so either use fill or use height and width.
            width={400} //=> Intrinsic width => css override them
            height={400} //=> Intrinsic height => css override them
            // 1. Intrinsic size => actual size of the element without applying css.
            // 1. Rendered size.=> style after applied css.
            //=> Intrinsic size of image is the orizinal size of image
            // => the height and width property is set the intrinsic size of the image not the rendered size;
            // => size is rendered by css.
            // The size of an element or image based on its content, without considering the CSS applied to it

            // warning
            // Either height or width, one of them is changed according to the rendered size of the element.
            // for example, in the mobile the width is compressed or stressed,
            // because of this the aspect ration destorted that is bad practice.
            // to overcome it
            className="w-auto h-auto"
            // the image is detected as largest contentfull paint
            // when an image detected as largest contentfull paint then priority property must be true.
            // this will preload the image and disable lazy loading.
            // the proriety property must not be used in laxy loading.
            // Should only be used when the image is visible above the fold
            // when the image is detected as largest contentfull paint, or it's above the fold, then priority property is used and set to true.
            // ABOVE THE FOLD mean loaded in the front page without scrilling, like main cover of the newspaper headlines are above the fold headlines.
            // above the fold mean visible on the screen without scrolling the screen.
            // while laxy loading used when the image shows after scrolling, if lazy loading is used then priority property must not be used.
            priority={true}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
