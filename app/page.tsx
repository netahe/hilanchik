"use client"

import {  useSession } from "next-auth/react";

export default function Home() {
      const { data: session, status } = useSession();

      console.log(session);
  return (
    <div>
      {status === "authenticated" ?  <p>Welcome to Hilanchik!</p> : <p>Please log in to view your information</p> }
    </div>
  );
}
