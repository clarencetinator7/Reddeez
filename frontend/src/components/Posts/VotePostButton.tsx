"use client";
import { LucideArrowBigDown, LucideArrowBigUp } from "lucide-react";

type VotePostProps = {
  post: Post;
  userId: string | null;
};

export default function VotePostButton({ post, userId }: VotePostProps) {
  let vote: Vote | undefined;
  let voteStatus: "U" | "D" | undefined;
  if (userId && post.votes.some((vote) => vote.userId === userId)) {
    vote = post.votes.find((vote) => vote.userId === userId);
    voteStatus = vote?.status;
    console.log(vote);
  }

  return (
    <div className="p-1 flex items-center gap-1 bg-slate-100 rounded-lg">
      <button
        className={`text-gray-500  ${
          voteStatus === "U" ? "text-amber-500" : "hover:text-amber-500"
        }`}
        disabled={!userId}
      >
        <LucideArrowBigUp className="w-6 h-6" />
      </button>
      <span
        className={`text-sm font-semibold  ${
          vote ? "text-amber-500" : "text-gray-500"
        }`}
      >
        {post.upvotes - post.downvotes}
      </span>
      <button
        className={`text-gray-500 ${
          voteStatus === "D" ? "text-amber-500" : "hover:text-amber-500"
        } hover:text-amber-500`}
        disabled={!userId}
      >
        <LucideArrowBigDown className="w-6 h-6" />
      </button>
    </div>
  );
}
