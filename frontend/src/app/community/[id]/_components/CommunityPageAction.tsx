import { getMyCommunities } from "@/app/_components/MyCommunities";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import JoinCommunityButton from "./JoinButton";

type CommunityPageActionProps = {
  session: Session | null;
  id: number;
};

export default async function CommunityPageAction({
  session,
  id,
}: CommunityPageActionProps) {
  let isAlreadyMember = false;

  if (session) {
    const myCommunities: Community[] = await getMyCommunities(session);
    // Check if user is a member of the community
    // * FIXME: This always return false
    // - The issue is that id is a string despite having a number type.
    const isMember = myCommunities.some((community) => community.id === id);
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
