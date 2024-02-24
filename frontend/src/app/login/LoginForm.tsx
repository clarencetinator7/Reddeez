"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data: FieldValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
      router.refresh();
    } else {
      const apiErr = JSON.parse(res.error);
      console.log(apiErr);

      if (apiErr.errors) {
        for (const [key, value] of Object.entries(apiErr.errors)) {
          setError(key, {
            type: "manual",
            message: value as string,
          });
        }
      } else {
        setError("email", {
          type: "manual",
          message: apiErr.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <div></div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
      </div>
      <div className="mt-3">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
