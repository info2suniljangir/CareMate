"use client";
import { Session } from "next-auth";
import { createContext, useState, useEffect } from "react";




export const AuthContext = createContext<Session | null>(null);


export const AuthContextProvider = ({
    children,
    value
} : {
    children: React.ReactNode;
    value: Session | null;
}) => {


    const [session, setSession] = useState<Session | null>(value);

    // const userFetch = useCallback(async () => {
    //     const sessionData = await getSession();
    //     if (sessionData?.user) {
    //         setSession(sessionData);
    //         return sessionData;
    //     }
    //     throw new Error("user not found");
    // }, [])

    useEffect(() => {
        setSession(value);
    }, [value]);

    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
}