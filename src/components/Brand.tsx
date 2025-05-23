



import React from "react"
import Image from "next/image";
// import { assets} from "@/assets/assets";
import { ubuntu } from "@/utils/font";
import { logoImageUrl } from "@/library/imageurl";

const Brand:React.FC = () => {

  return (
     <div className="flex gap-2 items-center font-bold hover:cursor-pointer">
              <Image
                src={logoImageUrl}
                alt="Logo.png"
                height={40}
                width={40}
                className=""
              />
    
              <div className={`${ubuntu.className} text-custom-red`}>CareMate</div>
            </div>
  )
};

export default Brand;
