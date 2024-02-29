"use server";

export default async function getPost(postId: string) {
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
    console.log(resData);
    throw new Error(resData.message);
  }

  return resData.data;
}
