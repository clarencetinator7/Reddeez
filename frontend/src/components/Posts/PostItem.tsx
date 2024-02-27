type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div key={post.id} className="p-5 border rounded-md">
      <div>
        <span className="text-sm">
          n/
          <span>{post.postedBy.username}</span>
        </span>
      </div>
      <h1 className="font-semibold mb-2">{post.title}</h1>
      <p className="">{post.body}</p>
    </div>
  );
}
