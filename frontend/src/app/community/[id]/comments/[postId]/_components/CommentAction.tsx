"use client";
import VotePostButton from "@/components/Posts/VotePostButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { replyToComment } from "@/services/comment";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type CommentActionProps = {
  reply: Reply;
  userId: string | null;
};

export default function CommentAction({ reply, userId }: CommentActionProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isCommenting, setIsCommenting] = useState(false);

  const onCommentHandler: SubmitHandler<FieldValues> = async (data) => {
    const res = await replyToComment({ commentId: reply.id, body: data.body });

    if (res.success) {
      reset();
      setIsCommenting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <VotePostButton
          userId={userId}
          voteable={reply}
          voteableType="comment"
        />
        <button
          className="px-2 py-0 font-semibold text-sm text-gray-500 bg-slate-100 rounded-lg"
          onClick={() => setIsCommenting(true)}
        >
          Reply
        </button>
      </div>
      {isCommenting && (
        <form onSubmit={handleSubmit(onCommentHandler)} className="w-full">
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
      )}
    </>
  );
}
