import { getServerSession } from "next-auth";
import TopCommunities from "./TopCommunities";
import JoinedCommunities from "./JoinedCommunities";
import { authOptions } from "../api/auth/[...nextauth]/options";
import MyCommunities from "./MyCommunities";
import HomeButton from "./HomeButton";

export default async function CommunityPanel() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full max-w-[250px] max-h-[calc(100vh-60px)] px-5 py-10 sticky top-[60px] overflow-y-auto">
      <HomeButton />
      <hr className="my-2" />
      {/* COMMUNITIES */}
      {/* <h3 className="font-bold mb-5">Communities</h3> */}
      {session && (
        <>
          <MyCommunities />
          <hr className="my-2" />
        </>
      )}
      {session && (
        <>
          <JoinedCommunities session={session} />
          <hr className="my-2" />
        </>
      )}
      <TopCommunities />
    </div>
  );
}
