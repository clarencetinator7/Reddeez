"use client";
import { vote } from "@/services/vote";
import { LucideArrowBigDown, LucideArrowBigUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";

type VotePostProps = {
  voteable: Post | Reply;
  userId: string | null;
  voteableType: "post" | "comment";
};

function updatePostReducer(
  state: Post | Reply,
  { voteStatus, userId }: { voteStatus: "U" | "D"; userId: string }
) {
  // Check if the user have voted
  const userVote = state.votes.find((vote) => vote.userId === userId);

  if (userVote) {
    // Check if voteStatus is the same as the user vote status
    if (userVote.status === voteStatus) {
      // If it is, remove the vote
      state.votes = state.votes.filter((vote) => vote.userId !== userId);
      if (voteStatus === "U") {
        state.upvotes -= 1;
      } else {
        state.downvotes -= 1;
      }
    } else {
      // If it isn't, update the vote
      userVote.status = voteStatus;
      if (voteStatus === "U") {
        state.upvotes += 1;
        state.downvotes -= 1;
      } else {
        state.downvotes += 1;
        state.upvotes -= 1;
      }
    }
  }

  // If the user haven't voted, add the vote
  else {
    state.votes.push({ userId, status: voteStatus } as Vote);
    if (voteStatus === "U") {
      state.upvotes += 1;
    } else {
      state.downvotes += 1;
    }
  }

  return state;
}

export default function VotePostButton({
  voteable,
  userId,
  voteableType,
}: VotePostProps) {
  let voteData: Vote | undefined;
  let voteStatus: "U" | "D" | undefined;

  const [optimisticPost, setOptimisticPost] = useOptimistic(
    voteable,
    updatePostReducer
  );
  const [, startTransition] = useTransition();

  if (userId && optimisticPost.votes.some((vote) => vote.userId === userId)) {
    voteData = optimisticPost.votes.find((vote) => vote.userId === userId);
    voteStatus = voteData?.status;
  }

  const onVoteHandler = async (voteStatus: "U" | "D") => {
    if (!userId) return;
    setOptimisticPost({ voteStatus, userId });
    const stat = await vote(
      voteable.id,
      voteStatus.toLowerCase(),
      voteableType
    );
    console.log(stat);
  };

  return (
    <div
      className={`p-1 flex items-center gap-1 bg-slate-100 rounded-lg border ${
        voteData ? "border-amber-500" : "border-transparent"
      }`}
    >
      <button
        className={`  ${
          voteStatus === "U"
            ? "text-amber-500"
            : "text-gray-500 hover:text-amber-500"
        }`}
        disabled={!userId}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => onVoteHandler("U"));
        }}
      >
        <LucideArrowBigUp className="w-6 h-6" />
      </button>
      <span
        className={`text-sm font-semibold  ${
          voteData ? "text-amber-500" : "text-gray-500"
        }`}
      >
        {voteable.upvotes - voteable.downvotes}
      </span>
      <button
        className={` ${
          voteStatus === "D"
            ? "text-amber-500"
            : "text-gray-500 hover:text-amber-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => onVoteHandler("D"));
        }}
        disabled={!userId}
      >
        <LucideArrowBigDown className="w-6 h-6" />
      </button>
    </div>
  );
}
