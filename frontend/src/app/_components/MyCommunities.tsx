import { getUserCommunities } from "@/services/community";
import CommunityList from "./CommunityList";

export default async function MyCommunities() {
  const ownedCommunities: Community[] = await getUserCommunities();

  return (
    <div>
      <h4 className="text-sm text-gray-500 tracking-wide">YOUR COMMUNITIES</h4>
      {ownedCommunities.length > 0 && (
        <CommunityList communities={ownedCommunities}>
          OWNED COMMUNITIES
        </CommunityList>
      )}
    </div>
  );
}
