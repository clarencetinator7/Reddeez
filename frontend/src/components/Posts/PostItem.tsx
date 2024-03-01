import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PostItemContainer from "./PostItemContainer";
import PostAction from "./PostAction";

type PostItemProps = {
  post: Post;
  fromIndex?: boolean;
};

export default function PostItem({ post, fromIndex }: PostItemProps) {
  return (
    <PostItemContainer post={post} fromIndex={fromIndex}>
      <div key={post.id} className="p-5 border rounded-md hover:bg-slate-50">
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="w-5 h-5">
            <AvatarImage src={post.postedBy.avatar} alt="avatar" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>

          {fromIndex ? (
            <span className="text-sm font-semibold">
              <span>r/{post.community.name}</span>
            </span>
          ) : (
            <span className="text-sm">
              n/
              <span>{post.postedBy.username}</span>
            </span>
          )}
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
    </PostItemContainer>
  );
}
