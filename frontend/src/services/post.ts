"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function getPost(postId: string) {
  const res = await fetch(
    `http://localhost:8000/api/post/${postId}?includeComments=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { tags: ["Post"] },
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }

  return resData.data;
}

export async function createPost({
  data,
  communityId,
}: {
  data: FieldValues;
  communityId: string;
}) {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://localhost:8000/api/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify({ ...data, communityId }),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }
  revalidateTag("CommunityPosts");
  if (resData.success) {
    redirect(`/community/${communityId}/comments/${resData.data?.id}`);
  }
  return resData;
}

export async function getFeed(page = 1) {
  const session = await getServerSession(authOptions);

  if (!session) {
    const res = await fetch(
      `http://localhost:8000/api/post/feed?page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message);
    }

    return resData;
  }

  const res = await fetch(
    `http://localhost:8000/api/user/myFeed?page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: "no-store",
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }

  return resData;
}
