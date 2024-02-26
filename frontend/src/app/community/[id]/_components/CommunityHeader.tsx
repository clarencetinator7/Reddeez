import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CommunityPageAction from "./CommunityPageAction";
import { getServerSession } from "next-auth";
import { getCommunityById } from "@/services/community";

export default async function CommunityHeader({ id }: { id: string }) {
  const session = await getServerSession(authOptions);
  const community: Community = await getCommunityById(id);

  return (
    <div className="flex flex-row justify-between">
      <h2 className="text-2xl font-bold">r/{community.name}</h2>
      <CommunityPageAction session={session} id={id} />
    </div>
  );
}
