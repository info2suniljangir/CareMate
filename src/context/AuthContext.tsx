"use client";
import { Session } from "next-auth";
import { createContext, useState, useEffect, useCallback } from "react";
import { getSession } from "next-auth/react";




export const AuthContext = createContext<Session | null>(null);


export const AuthContextProvider = ({
    children,
    value
} : {
    children: React.ReactNode;
    value: Session | null;
}) => {


    const [session, setSession] = useState<Session | null>(value);

   useCallback(async () => {
        const sessionData = await getSession();
        if (sessionData?.user) {
            setSession(sessionData);
        }
        throw new Error("user not found");
    }, []);

    useEffect(() => {
        setSession(value);
    }, [value]);

    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
}