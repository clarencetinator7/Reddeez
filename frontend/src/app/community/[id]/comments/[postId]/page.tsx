import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { getPost } from "@/services/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import VotePostButton from "@/components/Posts/VotePostButton";
import { LucideMessageSquare } from "lucide-react";
import CommentSection from "./_components/CommentSection";
import AddCommentButton from "./_components/AddComment";

export default async function PostComments({
  params,
}: {
  params: { postId: string };
}) {
  const post: Post = await getPost(params.postId);
  const session = await getServerSession(authOptions);

  return (
    <div className="flex-1">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.postedBy.avatar} alt="avatar" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="space-x-1">
              <span className="font-bold">r/{post.community.name}</span>
              <span className="text-sm text-gray-500 space-x-1">
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">
                  {moment(post.createdAt).fromNow()}
                </span>
              </span>
            </div>
            <span>{post.postedBy.username}</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
        <div className="flex items-center gap-2">
          <VotePostButton
            voteable={post}
            userId={session?.user?.id || null}
            voteableType="post"
          />
          <div className="p-1.5 bg-slate-100 rounded-lg">
            <button className="flex gap-2 text-gray-500 hover:text-amber-500">
              <LucideMessageSquare className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {post.comments?.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* COMMENT SECTION */}
      <AddCommentButton postId={params.postId} />
      <CommentSection replies={post.comments || []} />
    </div>
  );
}
