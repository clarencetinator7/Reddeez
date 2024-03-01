import CommunityPostFeed from "@/components/Posts/CommunityPostFeed";
import { getCommunityPosts } from "@/services/community";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: posts, meta }: { data: Post[]; meta: any } =
    await getCommunityPosts(params.id);
  return (
    <div className="flex-1">
      <CommunityPostFeed
        initialPosts={posts}
        meta={meta}
        communityId={params.id}
      />
    </div>
  );
}
