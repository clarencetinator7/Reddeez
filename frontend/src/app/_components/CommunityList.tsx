import { getServerSession } from "next-auth";
import TopCommunities from "./TopCommunities";
import MyCommunities from "./MyCommunities";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function CommunityList() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full max-w-[250px] px-5 py-10 sticky top-[60px]">
      {/* COMMUNITIES */}
      <h3 className="font-bold mb-5">Communities</h3>
      {session && <MyCommunities session={session} />}
      <TopCommunities />
    </div>
  );
}
