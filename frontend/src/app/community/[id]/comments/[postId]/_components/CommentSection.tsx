import moment from "moment";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import VotePostButton from "@/components/Posts/VotePostButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type CommentSectionProps = {
  replies: Reply[];
};

type CommentProps = {
  reply: Reply;
  depth: number;
};

export default function CommentSection({ replies }: CommentSectionProps) {
  return (
    <div className="my-5">
      {replies.map((reply) => (
        <Comment key={reply.id} reply={reply} depth={0} />
      ))}
    </div>
  );
}

async function Comment({ reply, depth }: CommentProps) {
  const session = await getServerSession(authOptions);

  return (
    <div
      style={{
        marginLeft: depth,
      }}
      className="overflow-hidden"
    >
      <div className="flex items-start gap-2 mb-5 relative">
        <div
          className={`absolute w-[2px] h-screen left-[15px] bg-gray-200`}
        ></div>
        <div className="flex items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={reply.user.avatar} alt="avatar" />
            <AvatarFallback className="text-xs font-bold text-gray-500">
              DN
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="py-1 space-x-1">
            <span className="text-sm font-semibold">{reply.user.username}</span>
            <span className="text-gray-500 space-x-1">
              <span>•</span>
              <span>{moment(reply.commentedAt).fromNow()}</span>
            </span>
          </div>
          <div className="mt-1 flex flex-col items-start gap-2">
            <div>
              <p>{reply.comment}</p>
            </div>
            <div>
              <VotePostButton
                userId={session?.user.id || null}
                voteable={reply}
                voteableType="comment"
              />
            </div>
          </div>
        </div>
        {/* COMMENT ACTION */}
      </div>
      {reply.replies?.map((rep) => (
        <Comment key={rep.id} reply={rep} depth={depth + 25} />
      ))}
    </div>
  );
}
