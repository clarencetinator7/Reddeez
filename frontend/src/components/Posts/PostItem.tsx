import {
  LucideArrowBigDown,
  LucideArrowBigUp,
  LucideMenuSquare,
  LucideMessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      </div>
      <h1 className="font-semibold mb-2">{post.title}</h1>
      <p className="">{post.body}</p>
      <PostAction post={post} />
    </div>
  );
}

function PostAction({ post }: PostItemProps) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="p-1 flex items-center gap-1 bg-slate-100 rounded-lg">
        <button className=" text-gray-500 hover:text-amber-500">
          <LucideArrowBigUp className="w-6 h-6" />
        </button>
        <span className="text-sm font-semibold text-gray-500">
          {post.upvotes - post.downvotes}
        </span>
        <button className="text-gray-500 hover:text-amber-500">
          <LucideArrowBigDown className="w-6 h-6" />
        </button>
      </div>
      <div className="p-1.5 bg-slate-100 rounded-lg">
        <button className="text-sm text-gray-500 flex items-center gap-1 group-[comment] hover:text-amber-500">
          <LucideMessageSquare className="w-5 h-5" />
          <span className="text-sm font-semibold">10</span>
        </button>
      </div>
    </div>
  );
}
