"use client";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CreatePostButtonProps = {
  session: Session | null;
};

export default function CreatePostButton({ session }: CreatePostButtonProps) {
  const path = usePathname();
  return (
    <Button variant={"outline"} disabled={!session} asChild>
      <Link href={`${path}/submit`}>Create Post</Link>
    </Button>
  );
}
