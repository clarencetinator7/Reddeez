"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/services/comment";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type AddCommentButtonProps = {
  postId: string;
};

export default function AddCommentButton({ postId }: AddCommentButtonProps) {
  const [isCommenting, setIsCommenting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onCommentHandler: SubmitHandler<FieldValues> = async (data) => {
    const res = await postComment({ postId, body: data.body });

    if (res.success) {
      reset();
      setIsCommenting(false);
    }
  };

  return (
    <div
      className={`${
        isCommenting ? "" : "px-3 py-2 border"
      } my-5 rounded-lg text-gray-500 text-sm cursor-text hover:border-amber-500`}
      onClick={() => setIsCommenting(true)}
    >
      {/* Add Comment */}
      {isCommenting ? (
        <form onSubmit={handleSubmit(onCommentHandler)}>
          {errors.body && <p className="text-red-500">Comment is required</p>}
          <Textarea
            className="outline-none w-full px-3 py-2 resize-none active:border-none active:outline-none"
            placeholder="Add a comment..."
            {...register("body", { required: true })}
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setIsCommenting(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Comment</Button>
          </div>
        </form>
      ) : (
        <p>Add Comment</p>
      )}
    </div>
  );
}
