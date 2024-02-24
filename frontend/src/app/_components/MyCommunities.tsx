import { Session } from "next-auth";

type MyCommunitiesProps = {
  session: Session | null;
};

async function getMyCommunities(session: Session) {
  const res = await fetch("http://localhost:8000/api/community/myCommunities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
  });
  const resData = await res.json();

  if (resData.success || res.ok) {
    return resData.data;
  } else {
    throw new Error(resData.message);
  }
}

export default async function MyCommunities({ session }: MyCommunitiesProps) {
  const myCommunity: Community[] = await getMyCommunities(session!);
  return (
    <div className="min-h-[70px]">
      <h3 className="text-sm text-gray-500 tracking-wide">YOUR COMMUNITIES</h3>
      <ul>
        {myCommunity.map((community) => {
          return (
            <li
              key={community.id}
              className="py-1 px-2 my-1 rounded cursor-pointer hover:bg-slate-200"
            >
              <a href={`/c/${community.id}`}>n/{community.name}</a>
            </li>
          );
        })}
        {myCommunity.length === 0 && (
          <p className="text-xs text-gray-500">
            You are not a member of any community :&lt;
          </p>
        )}
      </ul>
    </div>
  );
}
