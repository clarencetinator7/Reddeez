import { getUserCommunities } from "@/services/community";
import CommunityList from "./CommunityList";
import CreateCommunityButton from "./CreateCommunityButton";

export default async function MyCommunities() {
  const ownedCommunities: Community[] = await getUserCommunities();

  return (
    <div>
      <CreateCommunityButton />
      {ownedCommunities.length > 0 && (
        <CommunityList communities={ownedCommunities}>OWNED</CommunityList>
      )}
    </div>
  );
}
