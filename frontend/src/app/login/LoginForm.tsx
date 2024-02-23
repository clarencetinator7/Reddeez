"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data: FieldValues) => {
    console.log(data);
    const resData = await login(data);

    if (resData.success) {
      // Redirect to home page
      console.log("Login success");
      router.push("/");
      return;
    }

    if (resData.errors) {
      for (const [key, value] of Object.entries(resData.errors)) {
        setError(key, {
          type: "manual",
          message: value as string,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
