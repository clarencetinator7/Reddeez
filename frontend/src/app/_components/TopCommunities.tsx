const getTopCommunities = async () => {
  const res = await fetch("http://localhost:8000/api/community/top", {
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

export default async function TopCommunities() {
  const topCommunities: Community[] = await getTopCommunities();
  return (
    <div>
      <h3 className="text-sm text-gray-500 tracking-wide">TOP COMMUNITIES</h3>
      <ul>
        {topCommunities.map((community) => {
          return (
            <li
              key={community.id}
              className="py-1 px-2 my-1 rounded cursor-pointer hover:bg-slate-200"
            >
              <a href={`/c/${community.id}`}>n/{community.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
