"use server";

import { FieldValues } from "react-hook-form";
import getCSRF from "./csrf";
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
