"use server";

import { FieldValues } from "react-hook-form";
import getCSRF from "./csrf";
import { cookies } from "next/headers";

// export async function login() {
//   // Send the login request
//   const response = await fetch("http://localhost:8000/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       // Get the xsrf token from the cookie
//       "x-xsrf-token": cookies().get("XSRF-TOKEN")?.value as string,
//     },
//     credentials: "include",
//     body: JSON.stringify({}),
//   });

//   return response;
// }
