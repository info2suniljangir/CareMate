import { StaticImageData } from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export interface SpecialityDataType {
    speciality: string;
    image: IconProp;
};


export interface DoctorInfo {
    
        _id: number;
        name: string;
        image: string;
        speciality: string;
        degree: string;
        experience: string;
        about: string;
        fees: number;
        address: string;
        slots_booked: object,
    
};


export interface User {
    _id: number; 
    name: string;
    email: string;
    image?: string | null;
    phone: string; // Defaults to '000000000'
    address: string; // JSONB field as an object
    gender: string; // Defaults to 'Not Selected'
    dob: string; // Defaults to 'Not Selected'
    password: string; // Hashed password
  };

export interface ImageAssetsTypes {
    [key: string]: StaticImageData
}

