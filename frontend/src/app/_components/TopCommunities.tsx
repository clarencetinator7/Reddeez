import Link from "next/link";
import CommunityList from "./CommunityList";

const getTopCommunities = async () => {
  const res = await fetch("http://localhost:8000/api/community/top", {
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
};

export default async function TopCommunities() {
  const topCommunities: Community[] = await getTopCommunities();
  return (
    <div>
      {/* <h3 className="text-sm text-gray-500 tracking-wide">TOP COMMUNITIES</h3> */}
      <CommunityList communities={topCommunities}>
        TOP COMMUNITIES
      </CommunityList>
    </div>
  );
}
