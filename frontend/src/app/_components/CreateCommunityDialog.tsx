"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCommunity } from "@/services/community";
import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

type CreateCommunityDialogProps = {
  onCloseHandler: () => void;
};

export default function CreateCommunityDialog({
  onCloseHandler,
}: CreateCommunityDialogProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const resData = await createCommunity(data);
    console.log(resData);
    setIsLoading(false);
    if (resData.success) {
      reset();
      onCloseHandler();
      return;
    }

    if (resData.errors) {
      for (const key in resData.errors) {
        setError(key, {
          type: "server",
          message: resData.errors[key][0],
        });
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Create a Community</DialogTitle>
        <DialogDescription>
          Communities are great for hosting discussions, posting articles,
          finding support, and more.
        </DialogDescription>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label htmlFor="name">Community Name</Label>
            <Input type="text" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 text-sm">{`${errors.name.message}`}</span>
            )}
          </div>
          <div className="">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <span className="text-red-500 text-sm">{`${errors.description.message}`}</span>
            )}
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              className="mt-5"
              onClick={onCloseHandler}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="mt-5" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
