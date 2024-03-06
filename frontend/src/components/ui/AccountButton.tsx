"use client";
import { LucideLogOut, LucideUserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { logout } from "@/services/auth";
import { signOut } from "next-auth/react";

export default function ProfileButton() {
  const onLogout = async () => {
    // Delete token from backend
    const res = await logout();
    if (!res.success) return;
    // Sign out from next-auth
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://www.gravatar.com/avatar/" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-base md:min-w-[200px]">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <LucideUserCircle2 className="mr-2" size={20} />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LucideLogOut className="mr-2" size={20} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
