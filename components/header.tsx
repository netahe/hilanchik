"use client";

import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Link from "next/link";

const SessionToggle = () => {
  const { data: session, status } = useSession();

  return status === "authenticated" ? (
    <Button onPress={() => signOut()}>התנתקות</Button>
  ) : (
    <Button onPress={() => signIn()}>התחברות</Button>
  );
};

export const Header = () => {
       const { data: session, status } = useSession();

  return (
    <Navbar>
      <NavbarContent justify="end">
        {status === 'authenticated' && <> <NavbarMenuToggle />
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href="/update">עדכון שעות</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/reports">דוחות</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/settings">הגדרות</Link>
          </NavbarMenuItem>
        </NavbarMenu> </>}
        <NavbarBrand>
          <h1>חילנצ'יק</h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="start">
        <NavbarItem>
          <SessionToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
