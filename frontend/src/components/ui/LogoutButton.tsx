"use client";
import { signOut } from "next-auth/react";
import { Button } from "./button";
import { logout } from "@/services/auth";

export default function LogoutButton() {
  const onLogout = async () => {
    // Delete token from backend
    const res = await logout();
    if (!res.success) return;
    // Sign out from next-auth
    signOut();
  };
  return (
    <Button variant="ghost" onClick={onLogout}>
      Logout
    </Button>
  );
}
