import moment from "moment";
import { LucideMessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import VotePostButton from "./VotePostButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div key={post.id} className="p-5 border rounded-md">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="w-5 h-5">
          <AvatarImage src={post.postedBy.avatar} alt="avatar" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
        <span className="text-sm">
          n/
          <span>{post.postedBy.username}</span>
        </span>
        <span className="text-sm text-gray-500 space-x-1">
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">
            {moment(post.createdAt).fromNow()}
          </span>
        </span>
      </div>
      <h1 className="font-semibold mb-2">{post.title}</h1>
      <p className="">{post.body}</p>
      <PostAction post={post} />
    </div>
  );
}

async function PostAction({ post }: PostItemProps) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center gap-2 mt-2">
      <VotePostButton post={post} userId={session?.user.id || null} />
      <div className="p-1.5 bg-slate-100 rounded-lg">
        <button className="text-sm text-gray-500 flex items-center gap-1 group-[comment] hover:text-amber-500">
          <LucideMessageSquare className="w-5 h-5" />
          <span className="text-sm font-semibold">10</span>
        </button>
      </div>
    </div>
  );
}
