"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

export const joinCommunity = async (communityId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `http://localhost:8000/api/community/${communityId}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const resData = await res.json();

  console.log(resData);

  if (resData.success || res.ok) {
    revalidateTag("MyCommunities");
    return resData;
  } else {
    throw new Error(resData.message);
  }
};
