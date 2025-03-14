import { StaticImageData } from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export interface SpecialityDataType {
    speciality: string;
    image: IconProp;
};

export interface DoctorInfo {
    
        _id: string;
        name: string;
        // this is the type of image
        image: StaticImageData;
        speciality: string;
        degree: string;
        experience: string;
        about: string;
        fees: number;
        address: {
            line1: string;
            line2: string;
        }
    
};

export interface ImageAssetsTypes {
    [key: string]: StaticImageData
}