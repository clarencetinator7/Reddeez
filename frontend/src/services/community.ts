"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

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
      next: { tags: ["OwnedCommunities"] },
    }
  );

  const resData = await res.json();

  if (res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
};

export const createCommunity = async (data: FieldValues) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:8000/api/community/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description ? data.description : null,
    }),
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: resData.message,
      errors: resData.errors,
    };
  } else {
    revalidateTag("OwnedCommunities");
    return resData;
  }
};

export const getCommunityById = async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/community/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const resData = await res.json();

  if (resData.success || res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
};

export const getCommunityPosts = async (id: string, page = 1) => {
  const res = await fetch(
    `http://localhost:8000/api/community/${id}/posts?page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { tags: ["CommunityPosts"] },
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  } else {
    return {
      data: resData.data,
      meta: resData.meta,
    };
  }
};

export const searchCommunity = async (query: string) => {
  const res = await fetch(
    `http://localhost:8000/api/community/search?q=${query}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  } else {
    return resData.data;
  }
};
