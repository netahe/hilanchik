"use client"

import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export const Header = () => {
     const { data: session, status } = useSession();
 
     return status === "authenticated" ? <button onClick={() => signOut()}>התנתקות</button> : <button onClick={() => signIn()}>התחברות</button>
}