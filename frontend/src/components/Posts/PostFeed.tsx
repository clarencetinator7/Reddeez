"use client";
import PostItem from "./PostItem";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState } from "react";
import { getCommunityPosts } from "@/services/community";

type PostFeedProps = {
  initialPosts: Post[];
  meta: any;
  communityId: string;
};

export default function PostFeed({
  initialPosts,
  meta,
  communityId,
}: PostFeedProps) {
  const lastPage = meta.last_page || 1;

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    if (page <= lastPage) {
      // load more posts
      setPage(nextPage);
      const { data } = await getCommunityPosts(communityId, nextPage);
      setPosts((prev) => [...prev, ...data]);
    }
  }, [page, lastPage, communityId]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {page < lastPage && (
        <div ref={ref} className="text-center">
          Loading...
        </div>
      )}
    </div>
  );
}
