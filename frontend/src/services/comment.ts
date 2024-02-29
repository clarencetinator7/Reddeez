"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export default async function postComment({
  postId,
  body,
}: {
  postId: string;
  body: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `http://localhost:8000/api/post/${postId}/writeComment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({ body }),
    }
  );

  const resData = await res.json();

  if (resData.success || res.ok) {
    revalidateTag("Post");
    revalidateTag("CommunityPosts");
    return resData;
  } else {
    throw new Error(resData.message);
  }
}
