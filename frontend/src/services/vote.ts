"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function vote(
  voteId: string,
  voteStatus: string,
  voteType: string
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `http://localhost:8000/api/vote/${voteId}?voteStatus=${voteStatus}&type=${voteType}`,
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

  if (resData.success || res.ok) {
    revalidateTag("CommunityPosts");
    return resData;
  } else {
    throw new Error(resData.message);
  }
}
