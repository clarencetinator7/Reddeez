"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type PostItemContainer = {
  postId: string;
  children: React.ReactNode;
};

export default function PostItemContainer({
  postId,
  children,
}: PostItemContainer) {
  const path = usePathname();

  return <Link href={`${path}/comments/${postId}`}>{children}</Link>;
}
