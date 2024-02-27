"use client";
import { vote } from "@/services/vote";
import { LucideArrowBigDown, LucideArrowBigUp } from "lucide-react";
import { useOptimistic, useTransition } from "react";

type VotePostProps = {
  post: Post;
  userId: string | null;
};

function updatePostReducer(
  state: Post,
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

export default function VotePostButton({ post, userId }: VotePostProps) {
  let voteData: Vote | undefined;
  let voteStatus: "U" | "D" | undefined;

  const [optimisticPost, setOptimisticPost] = useOptimistic(
    post,
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
    await vote(post.id, voteStatus.toLowerCase(), "post");
  };

  return (
    <div
      className={`p-1 flex items-center gap-1 bg-slate-100 rounded-lg border ${
        voteData ? "border-amber-500" : "border-transparent"
      }`}
    >
      <button
        className={`text-gray-500  ${
          voteStatus === "U" ? "text-amber-500" : "hover:text-amber-500"
        }`}
        disabled={!userId}
        onClick={() => startTransition(() => onVoteHandler("U"))}
      >
        <LucideArrowBigUp className="w-6 h-6" />
      </button>
      <span
        className={`text-sm font-semibold  ${
          voteData ? "text-amber-500" : "text-gray-500"
        }`}
      >
        {post.upvotes - post.downvotes}
      </span>
      <button
        className={`text-gray-500 ${
          voteStatus === "D" ? "text-amber-500" : "hover:text-amber-500"
        } hover:text-amber-500`}
        onClick={() => startTransition(() => onVoteHandler("D"))}
        disabled={!userId}
      >
        <LucideArrowBigDown className="w-6 h-6" />
      </button>
    </div>
  );
}
