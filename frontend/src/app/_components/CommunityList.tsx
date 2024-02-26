import Link from "next/link";

type CommunityListProps = {
  communities: Community[];
};

export default function CommunityList({ communities }: CommunityListProps) {
  return (
    <ul>
      {communities.map((community) => {
        return (
          <li
            key={community.id}
            className="p-2 rounded hover:bg-slate-200 transition-all duration-200 cursor-pointer"
          >
            <Link key={community.id} href={`/community/${community.id}`}>
              n/{community.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
