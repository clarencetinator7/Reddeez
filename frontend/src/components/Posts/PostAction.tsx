import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LucideMessageSquare } from "lucide-react";
import { getServerSession } from "next-auth";
import VotePostButton from "./VotePostButton";

type PostItemProps = {
  post: Post;
};

export default async function PostAction({ post }: PostItemProps) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center gap-2 mt-2">
      <VotePostButton post={post} userId={session?.user.id || null} />
      <div className="p-1.5 bg-slate-100 rounded-lg">
        <button className="text-sm text-gray-500 flex items-center gap-1 group-[comment] hover:text-amber-500">
          <LucideMessageSquare className="w-5 h-5" />
          <span className="text-sm font-semibold">{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
}
