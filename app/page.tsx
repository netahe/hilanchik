"use client"

import { useSession } from "next-auth/react";
import {MainMenu} from '@/components/mainMenu';


export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-center max-w-[1024px]">
      {
      status === "authenticated" ?  
       <></>:
      <p>התחבר.י כדי לעדכן שעות</p> }
    </div>
  );
}
