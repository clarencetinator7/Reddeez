import { getFeed } from "@/services/post";
import PostFeed from "./_components/PostFeed";

export default async function Home() {
  const feed = await getFeed();

  return (
    <main className="flex items-center justify-center min-h-full p-5">
      <PostFeed initialPosts={feed.data} meta={feed.meta} />
    </main>
  );
}
