"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function logout() {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  });

  if (res.ok || res.status === 401) return { success: true };

  return { success: false };
}

export async function getUserData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session found");
  }

  const res = await fetch("http://localhost:8000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
  });

  const resData = await res.json();

  if(!res.ok) {
    throw new Error(resData.message);
  }

  return resData;


}
