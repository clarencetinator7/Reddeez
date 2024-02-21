"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RiCheckboxCircleFill } from "react-icons/ri";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    setIsLoading(false);
    if (!response.ok) {
      for (const key in resData.errors) {
        setError(key, {
          type: "server",
          message: resData.errors[key][0],
        });
      }
    } else {
      setIsSuccess(true);
      reset();
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-[450px] my-20">
        <CardHeader>
          <CardTitle className="font-extrabold">Register</CardTitle>
          <CardDescription className="">
            Create an account to join the community.
          </CardDescription>
          {isSuccess && (
            <Alert className="">
              <RiCheckboxCircleFill className="text-white-500 text-lg" />
              <AlertTitle>Registered Successfuly</AlertTitle>
              <AlertDescription>
                Your account has been created successfully created.{" "}
                <span className="underline underline-offset-2">
                  <Link href="/login">Click here to login.</Link>
                </span>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input type="text" {...register("username")} />
              {errors.username && (
                <span className="text-red-500">{`${errors.username.message}`}</span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <span className="text-red-500">{`${errors.email.message}`}</span>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <span className="text-red-500">{`${errors.password.message}`}</span>
              )}
            </div>
            <div>
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input type="password" {...register("password_confirmation")} />
              {errors.password_confirmation && (
                <span className="text-red-500">{`${errors.password_confirmation.message}`}</span>
              )}
            </div>
            <div className="my-2">
              <Button type="submit" disabled={isLoading}>
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
