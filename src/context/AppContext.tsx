
"use client";
// Note the component containing create context must always be a client component.

import { DoctorInfo } from "@/types/types";
import React, { createContext } from "react";
import { doctors } from "@/assets/assets";


// Defination: Context lets components pass information deep down without explicitly passing props.
// simply mean context itself does not contain any kind of information.
// Note: the default value only contained by context as fallback only, when no provider is provided


export const AppContext = createContext<DoctorInfo[] | null>(null);

// React.ReactNode => this is the prop type used if the children can following tyep
// type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

// React.element => this is used when working with context, because children of a context is always a react component.
// by default react childrens are read only things, these can not be mustate.

// But I put ReactNode because it must be same as it's component's childrens type, otherwise type mismatch.
const AppContextProvider= ({children}: Readonly<{children: React.ReactNode}>) => {

  // Here I can write data fetching logic
  

  return (
    // this way the value of context specified.
    // this value does not store by the context
    // context only represent the context to be provided or consumed.
    // this way dynamic vlaues can be provided.
    <AppContext.Provider value={doctors} >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;


