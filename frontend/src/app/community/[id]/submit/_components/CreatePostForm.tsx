"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/services/post";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type CreatePostFormProps = {
  communityId: string;
};

export default function CreatePostForm({ communityId }: CreatePostFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onPostHandler: SubmitHandler<FieldValues> = async (data) => {
    const resData = await createPost({ data, communityId });

    if (resData && resData.errors) {
      for (const key in resData.errors) {
        setError(key, {
          type: "server",
          message: resData.errors[key][0],
        });
      }
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit(onPostHandler)}>
      <div className="mb-2">
        <Input placeholder="Title" {...register("title", { required: true })} />
        {errors.title && (
          <span className="text-red-500">{`${errors.title.message}`}</span>
        )}
      </div>
      <div className="mb-2">
        <Textarea
          className="w-full min-h-[200px] resize-none"
          placeholder="Share something in the community ..."
          {...register("body", { required: true })}
        />
        {errors.body && (
          <span className="text-red-500">{`${errors.body.message}`}</span>
        )}
      </div>
      <div className="flex justify-end my-2">
        <Button type="submit" className="">
          Post
        </Button>
      </div>
    </form>
  );
}
