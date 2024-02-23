"use client";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { Button } from "./button";
import { logout } from "@/services/auth";

export default function Navbar() {
  const cookies = useCookies();

  const isLoggedIn = cookies.get("token");

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="h-[80px] flex justify-center items-center">
      <div className="w-full max-w-[1300px] px-5 flex justify-between items-center">
        <div>
          <h1 className="font-bold">ReddeezNuts</h1>
        </div>
        <nav>
          <ul className="flex space-x-5 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Button variant="ghost" onClick={onLogout}>
                  Logout
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
