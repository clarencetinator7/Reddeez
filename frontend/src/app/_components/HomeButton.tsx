"use client";
import { Button } from "@/components/ui/button";
import { LucideHome } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeButton() {
  const router = usePathname();

  const activeClass = router === "/" ? "bg-slate-100" : "";

  return (
    <Button
      className={`w-full text-sm text-gray-500 flex justify-start items-center gap-2 ${activeClass}`}
      variant={"ghost"}
      asChild
    >
      <Link href="/" className="">
        <LucideHome size={20} />
        <span>Home</span>
      </Link>
    </Button>
  );
}
