import CreatePostForm from "./_components/CreatePostForm";

export default function CreatePost({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Create Post</h1>
      </div>
      <hr className="my-2" />
      <CreatePostForm communityId={params.id} />
    </div>
  );
}
