import PostFeed from "@/components/Posts/PostFeed";
import { getCommunityPosts } from "@/services/community";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const posts: Post[] = await getCommunityPosts(params.id);
  return (
    <div className="flex-1">
      <PostFeed posts={posts} />
    </div>
  );
}
