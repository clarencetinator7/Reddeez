"use client";
import { Button } from "@/components/ui/button";
import { joinCommunity, leaveCommunity } from "@/services/community";
import { useParams } from "next/navigation";

type TJoinButtonProps = {
  disabled: boolean;
  isAlreadyMember: boolean;
};

export default function JoinCommunityButton({
  disabled,
  isAlreadyMember,
}: TJoinButtonProps) {
  const params = useParams<{ id: string }>();

  const onClickHandler = async () => {
    if (isAlreadyMember) {
      const res = await leaveCommunity(params.id);

      if (!res.success) {
        console.error(res.message);
      }
    } else {
      const res = await joinCommunity(params.id);
      if (!res.success) {
        console.error(res.message);
      }
    }
  };

  return (
    <Button
      type="button"
      variant={"default"}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {isAlreadyMember ? "Joined" : "Join"}
    </Button>
  );
}
