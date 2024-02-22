"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import getCSRF from "@/services/csrf";
import { useCookies } from "next-client-cookies";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cookies = useCookies();

  const onSubmitHandler = async (data: FieldValues) => {
    await getCSRF();

    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN") as string,
        Referer: "localhost:3000",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      console.log(resData);
    } else {
      console.log(resData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <div></div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" {...register("password")} />
        {errors.password && <p>{`${errors.password.message}`}</p>}
      </div>
      <div className="mt-3">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
