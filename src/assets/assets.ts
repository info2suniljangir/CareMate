import logo from "@/assets/images/logo.png";
import heroImage from "@/assets/images/hero.png";
import {
  faPersonPregnant,
  faUserDoctor,
  faBaby,
  faBrain,
  faHeadSideCough,
  faHandDots,
} from "@fortawesome/free-solid-svg-icons";
// import doc1 from "./images/doc1.png";
// import doc2 from "./images/doc2.png";
// import doc3 from "./images/doc3.png";
// import doc4 from "./images/doc4.png";
// import doc5 from "./images/doc5.png";
// import doc6 from "./images/doc6.png";
// import doc7 from "./images/doc7.png";
// import doc8 from "./images/doc8.png";
// import doc9 from "./images/doc9.png";
// import doc10 from "./images/doc10.png";
// import doc11 from "./images/doc11.png";
// import doc12 from "./images/doc12.png";
// import doc13 from "./images/doc13.png";
// import doc14 from "./images/doc14.png";
// import doc15 from "./images/doc15.png";
import aboutImage from "./images/about_image.png";
import contactImage from "./images/contact2.jpg";
import aboutImage2 from "./images/about_image2.jpg";
import {
  SpecialityDataType,
  DoctorInfo,
  ImageAssetsTypes,
} from "@/types/types";


// Image files are direct read from the image folder in seedimage route.
// export const seedImages = [
//   doc1,
//   doc2,
//   doc3,
//   doc4,
//   doc5,
//   doc6,
//   doc7,
//   doc8,
//   doc9,
//   doc10,
//   doc11,
//   doc12,
//   doc13,
//   doc14,
//   doc15,
// ];

export const assets: ImageAssetsTypes = {
  logo: logo,
  heroImage: heroImage,
  contactImage: contactImage,
  aboutImage: aboutImage,
  aboutImage2: aboutImage2,
};

export const specialityData: SpecialityDataType[] = [
  {
    speciality: "General physician",
    image: faUserDoctor,
  },
  {
    speciality: "Gynecologist",
    image: faPersonPregnant,
  },
  {
    speciality: "Dermatologist",
    image: faHandDots,
  },
  {
    speciality: "Pediatricians",
    image: faBaby,
  },
  {
    speciality: "Neurologist",
    image: faBrain,
  },
  {
    speciality: "Gastroenterologist",
    image: faHeadSideCough,
  },
];

export const doctors: DoctorInfo[] = [
    {
      _id: 1,
      name: "Dr. Richard James",
      image: "seed-images/doc1",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "17th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 2,
      name: "Dr. Emily Larson",
      image: "seed-images/doc2",
      speciality: "Gynecologist",
      degree: "MBBS",
      experience: "3 Years",
      about:
        "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 600,
      address:JSON.stringify({
        line1: "27th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 3,
      name: "Dr. Sarah Patel",
      image: "seed-images/doc3",
      speciality: "Dermatologist",
      degree: "MBBS",
      experience: "1 Year",
      about:
        "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 300,
      address: JSON.stringify({
        line1: "37th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 4,
      name: "Dr. Christopher Lee",
      image: "seed-images/doc4",
      speciality: "Pediatricians",
      degree: "MBBS",
      experience: "2 Years",
      about:
        "Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 400,
      address: JSON.stringify({
        line1: "47th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 5,
      name: "Dr. Jennifer Garcia",
      image: "seed-images/doc5",
      speciality: "Neurologist",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 6,
      name: "Dr. Andrew Williams",
      image: "seed-images/doc6",
      speciality: "Neurologist",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 7,
      name: "Dr. Christopher Davis",
      image: "seed-images/doc7",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "17th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 8,
      name: "Dr. Timothy White",
      image: "seed-images/doc8",
      speciality: "Gynecologist",
      degree: "MBBS",
      experience: "3 Years",
      about:
        "Dr. Timothy White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Timothy White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 600,
      address: JSON.stringify({
        line1: "27th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 9,
      name: "Dr. Ava Mitchell",
      image: "seed-images/doc9",
      speciality: "Dermatologist",
      degree: "MBBS",
      experience: "1 Year",
      about:
        "Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 300,
      address: JSON.stringify({
        line1: "37th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 10,
      name: "Dr. Jeffrey King",
      image: "seed-images/doc10",
      speciality: "Pediatricians",
      degree: "MBBS",
      experience: "2 Years",
      about:
        "Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 400,
      address: JSON.stringify({
        line1: "47th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 11,
      name: "Dr. Zoe Kelly",
      image: "seed-images/doc11",
      speciality: "Gastroenterologist",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 12,
      name: "Dr. Patrick Harris",
      image: "seed-images/doc12",
      speciality: "Neurologist",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 13,
      name: "Dr. Chloe Evans",
      image: "seed-images/doc13",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about:
        "Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 500,
      address: JSON.stringify({
        line1: "17th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 14,
      name: "Dr. Ryan Martinez",
      image: "seed-images/doc14",
      speciality: "Gynecologist",
      degree: "MBBS",
      experience: "3 Years",
      about:
        "Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 600,
      address: JSON.stringify({
        line1: "27th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
    {
      _id: 15,
      name: "Dr. Amelia Hill",
      image: "seed-images/doc15",
      speciality: "Dermatologist",
      degree: "MBBS",
      experience: "1 Year",
      about:
        "Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
      fees: 300,
      address: JSON.stringify({
        line1: "37th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      }),
    },
  ];