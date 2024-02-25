"use client";
import { Button } from "@/components/ui/button";
import { joinCommunity } from "@/services/community";
import { revalidatePath } from "next/cache";
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
      // Leave community
      return;
    } else {
      const res = await joinCommunity(params.id);

      if (res.success) {
        // revalidatePath(`/community/${params.id}`);
      } else {
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
