import { getMyCommunities } from "@/app/_components/MyCommunities";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import JoinCommunityButton from "./JoinButton";

type CommunityPageActionProps = {
  session: Session | null;
  id: string;
};

export default async function CommunityPageAction({
  session,
  id,
}: CommunityPageActionProps) {
  let isAlreadyMember = false;

  if (session) {
    const myCommunities: Community[] = await getMyCommunities(session);
    const isMember = myCommunities.some(
      (community) => parseInt(community.id) === parseInt(id)
    );
    isAlreadyMember = isMember;
  }

  return (
    <div className="space-x-2">
      <Button variant={"outline"} disabled={!session}>
        Create Post
      </Button>
      <JoinCommunityButton
        disabled={!session}
        isAlreadyMember={isAlreadyMember}
      />
    </div>
  );
}
