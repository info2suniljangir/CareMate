
"use client";
// Note the component containing create context must always be a client component.

import { DoctorInfo } from "@/types/types";
import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "@/assets/assets";


// Defination: Context lets components pass information deep down without explicitly passing props.
// simply mean context itself does not contain any kind of information.
// Note: the default value only contained by context as fallback only, when no provider is provided


export const AppContext = createContext<DoctorInfo[] | null>(null);

// React.ReactNode => this is the prop type used if the children can following tyep
// type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

// React.element => this is used when working with context, because children of a context is always a react component.
// by default react childrens are read only things, these can not be mustate.

// Parent of this AppContextProvider is layout,So in this case both of the components
// must has the same type of children props.
const AppContextProvider= ({children}: Readonly<{children: React.ReactNode}>) => {
  const [ doctors, setDoctors ] = useState<DoctorInfo[] | null>(null);

  // Here I can write data fetching logic

  // use effect hook
  // defination => it's a react hook that let you synchronize your component with an external system.
  // Side effect => tapping outside of the react. for example local storage.

  // structure
  // it takes two argument
  // 1: Setup function => this is the effects logic. and also returns a cleanup function.
  // Cleanup function => unsubscribe the effect. or remove the effect. run when ui is removed from the screen or when just before ui shown on the screen.

  // 2: Dependency array => An array of reactive values that is refrenced in the setup function.
  // reactive values => all the functions, states, or variables and props that is declared inside the components body.
  // [a , b] => rerender when a or b both or one of them changed.
  // [] => run only once on initial render.
  // no dependency array => run every time when component is rendered or rerendered.

  // returns undefined.

  // Note: 
  // 1:if you are not synchronizing the component with an external system then do not use useEffect hook.
  // 2: try to use list dependencies in the dependency array. remove redundant dependencies. 

  // uses
  // 1: connecting to an external system
  // 2: subscribing to an event like a browser event. => adding eventListener to the dom element.
  // 3: data fetching => fetching data from an api.
  // 4: triggering an animation.


  useEffect(() => {


    // diffrence between fetch and axios
    // 1:
    // fetch convert json into javascript object using .json() method
    // axios convert json into javascript object by default.

    // 2:
    // fetch does not have a built-in error handling mechanism.
    // axios has a built-in error handling mechanism.

    // 3: 
    //fetch is a browsers native api
    // axios is a third party library

    // 4: 
    // request and response converted into json and object by methods like stringify and json
    // while in axios it is done by default.

    // 5
    // no built in cancelation, timeout, and interceptors
    // axios has built in cancelation, timeout, and interceptors
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // this json method is the method of response interface
        // used in fetch api
        // convert json response in to a javascript object
        // it always returns a promise.
        const result = await response.json();
        setDoctors(result.data);
      } catch (error){
        // this will check that the type of error is Error or not
        // if type of erro is error then return true
        // otherwise it return false.
        if (error instanceof Error) {
          console.error(`HTTP error! Status: ${error.message}`);
        } else {
          console.error("An unknown error occurred");
        } 
      }
    
    };
    fetchData();
  }, []);

  

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


