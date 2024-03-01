"use client";
import { url } from "inspector";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type PostItemContainer = {
  post: Post;
  children: React.ReactNode;
  fromIndex?: boolean;
};

export default function PostItemContainer({
  post,
  children,
  fromIndex,
}: PostItemContainer) {
  const path = usePathname();

  const urlPath = fromIndex
    ? `/community/${post.communityId}/comments/${post.id}`
    : `${path}/comments/${post.id}`;

  return <Link href={urlPath}>{children}</Link>;
}
