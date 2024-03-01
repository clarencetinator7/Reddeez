"use client";
import { LucideMessageSquare } from "lucide-react";
import VotePostButton from "./VotePostButton";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

type PostItemProps = {
  post: Post;
};

export default function PostAction({ post }: PostItemProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const getUserId = async () => {
    const session = await getSession();
    if (session) {
      setUserId(session.user.id);
    }
  };
  useEffect(() => {
    getUserId();
  });

  return (
    <div className="flex items-center gap-2 mt-2">
      <VotePostButton voteable={post} userId={userId} voteableType="post" />
      <div className="p-1.5 bg-slate-100 rounded-lg">
        <button className="text-sm text-gray-500 flex items-center gap-1 group-[comment] hover:text-amber-500">
          <LucideMessageSquare className="w-5 h-5" />
          <span className="text-sm font-semibold">{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
}
