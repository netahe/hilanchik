"use client"

import { useSession } from "next-auth/react";
import {MainMenu} from '@/components/mainMenu';


export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      {
      status === "authenticated" ?  
       <MainMenu /> :
      <p>התחבר.י כדי לעדכן שעות</p> }
    </div>
  );
}
