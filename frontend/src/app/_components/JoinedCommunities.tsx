import { Session } from "next-auth";
import Link from "next/link";
import CommunityList from "./CommunityList";

type MyCommunitiesProps = {
  session: Session | null;
};

export async function getMyCommunities(session: Session) {
  const res = await fetch("http://localhost:8000/api/community/myCommunities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
    next: { tags: ["MyCommunities"] },
  });
  const resData = await res.json();

  if (resData.success || res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
}

export default async function JoinedCommunities({
  session,
}: MyCommunitiesProps) {
  const myCommunity: Community[] = await getMyCommunities(session!);
  return (
    <div className="mb-5">
      {/* <h3 className="text-sm text-gray-500 tracking-wide">YOUR COMMUNITIES</h3> */}

      {myCommunity.length === 0 ? (
        <p className="text-sm text-gray-500">
          You are not a member of any community :&lt;
        </p>
      ) : (
        <CommunityList communities={myCommunity}>
          JOINED COMMUNITIES
        </CommunityList>
      )}
    </div>
  );
}
