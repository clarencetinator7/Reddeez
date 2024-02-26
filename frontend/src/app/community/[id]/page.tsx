import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import CommunityPageAction from "./_components/CommunityPageAction";
import { getCommunityById } from "@/services/community";

export default async function CommunityPage() {
  return <main className="h-full flex-grow">POSTS GOES HERE</main>;
}
