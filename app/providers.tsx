"use client";

import { HeroUIProvider } from "@heroui/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </HeroUIProvider>
  );
}
