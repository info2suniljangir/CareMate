
"use client";

import { DoctorInfo } from "@/types/types";
import React, { createContext, useEffect, useState } from "react";


export interface AppContextType {
  doctors: DoctorInfo[] | null,
  getDoctorsData: () => void;

} 


export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider= ({children}: Readonly<{children: React.ReactNode}>) => {
  const [ doctors, setDoctors ] = useState<DoctorInfo[] | null>(null);

  const getDoctorsData = async () => {
    try {
      const response = await fetch("/api");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setDoctors(result.data);
    } catch (error){
      if (error instanceof Error) {
        console.error(`HTTP error! Status: ${error.message}`);
      } else {
        console.error("An unknown error occurred");
      } 
    }
  
  };


  useEffect(() => {
    getDoctorsData();
  }, []);



  

  return (
    <AppContext.Provider value={{doctors: doctors, getDoctorsData: getDoctorsData}} >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;


