import { AppContext } from '@/context/AppContext';


import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";


export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    // if (!authContext) {
    //     throw new Error("useAuthContext must be used withn AuthContextProvider");
    // }


    return authContext;
}

export const useAppContext = () => {
    const appContext = useContext(AppContext)

    if (!appContext) {
        throw new Error ("Auth context must be used within auth context provider")
    }

    return appContext;
}