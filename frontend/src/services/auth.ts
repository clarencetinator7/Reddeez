"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

type TUser = {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
};

function setTokenToCookies(token: string) {
  cookies().set("token", token);
}

function setUserToCookies(user: TUser) {
  cookies().set("userId", user.id.toString());
}

export async function login(data: FieldValues) {
  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (res.ok) {
    setTokenToCookies(resData.token);
    setUserToCookies(resData.user);
    return { success: true, data: resData.user };
  } else {
    return resData;
  }
}

export async function logout() {
  const res = await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const resData = await res.json();

  console.log(resData);

  if (res.ok) {
    cookies().set("token", "");
    cookies().set("userId", "");
    return { success: true };
  }

  if (resData.message === "Unauthenticated.") {
    cookies().delete("token");
    cookies().delete("userId");
    return { success: true };
  }

  return { success: false };
}
