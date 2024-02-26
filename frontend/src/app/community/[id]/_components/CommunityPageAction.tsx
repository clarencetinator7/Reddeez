import { getMyCommunities } from "@/app/_components/JoinedCommunities";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import JoinCommunityButton from "./JoinButton";
import { getUserCommunities } from "@/services/community";

type CommunityPageActionProps = {
  session: Session | null;
  id: string;
};

export default async function CommunityPageAction({
  session,
  id,
}: CommunityPageActionProps) {
  let isAlreadyMember = false;
  let isOwner = false;

  if (session) {
    const myCommunities: Community[] = await getMyCommunities(session);
    isAlreadyMember = myCommunities.some(
      (community) => parseInt(community.id) === parseInt(id)
    );

    const ownedCommunities: Community[] = await getUserCommunities();
    isOwner = ownedCommunities.some(
      (community) => parseInt(community.id) === parseInt(id)
    );
  }

  return (
    <div className="space-x-2">
      <Button variant={"outline"} disabled={!session}>
        Create Post
      </Button>
      {!isOwner && (
        <JoinCommunityButton
          disabled={!session}
          isAlreadyMember={isAlreadyMember}
        />
      )}
    </div>
  );
}
