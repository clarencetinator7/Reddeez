"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

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

export const leaveCommunity = async (communityId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `http://localhost:8000/api/community/${communityId}/leave`,
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
    revalidateTag("MyCommunities");
    return resData;
  } else {
    throw new Error(resData.message);
  }
};

export const getUserCommunities = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `http://localhost:8000/api/community/ownedCommunities`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const resData = await res.json();

  if (res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
};
