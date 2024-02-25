import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import CommunityPageAction from "./_components/CommunityPageAction";

async function getCommunityById(id: number) {
  const res = await fetch(`http://localhost:8000/api/community/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const resData = await res.json();

  if (resData.success || res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
}

export default async function CommunityPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);
  const community: Community = await getCommunityById(params.id);
  return (
    <main className="h-full p-10">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">r/{community.name}</h2>
        <CommunityPageAction session={session} id={params.id} />
      </div>
    </main>
  );
}
