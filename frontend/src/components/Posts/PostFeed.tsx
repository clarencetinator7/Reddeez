import PostItem from "./PostItem";

type PostFeedProps = {
  posts: Post[];
};

export default function PostFeed({ posts }: PostFeedProps) {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
