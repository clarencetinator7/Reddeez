"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useCookies();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN") as string,
        Referer: "localhost:8000",
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
    <main className="w-full flex items-center justify-center">
      <Card className="w-[450px] my-20">
        <CardHeader>
          <CardTitle className="font-extrabold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
        </CardContent>
      </Card>
    </main>
  );
}
