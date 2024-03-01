"use client";

import PostItem from "@/components/Posts/PostItem";
import { getFeed } from "@/services/post";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type PostFeedProps = {
  initialPosts: Post[];
  meta: any;
};

export default function PostFeed({ initialPosts, meta }: PostFeedProps) {
  const lastPage = meta.last_page || 1;

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    if (page <= lastPage) {
      setPage(nextPage);
      const { data } = await getFeed(nextPage);
      setPosts((prev) => [...prev, ...data]);
    }
  }, [page, lastPage]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div className="w-full max-w-[900px] flex flex-col gap-3">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} fromIndex />
      ))}
      {page < lastPage && (
        <div ref={ref} className="text-center">
          Loading...
        </div>
      )}
    </div>
  );
}
