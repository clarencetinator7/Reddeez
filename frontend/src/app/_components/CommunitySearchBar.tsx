"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CommunitySearchInput from "./CommunitySearchInput";
import { useEffect, useState } from "react";
import { searchCommunity } from "@/services/community";

export default function CommunitySearchBar() {
  const params = useSearchParams();
  const q = params.get("search");
  const [community, setCommunity] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function search() {
      setIsLoading(true);
      const res = await searchCommunity(q || "");
      setCommunity(res);
      setIsLoading(false);
    }

    if (params.get("search")) {
      search();
    } else {
      setCommunity([]);
    }
  }, [params, q]);

  return (
    <div className="flex-1 max-w-[500px] relative">
      <CommunitySearchInput />
      {q && (
        <div className="absolute top-[45px] left-0 w-full max-h-[250px] flex flex-col pr-3 bg-white border overflow-y-scroll">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            community.map((c) => (
              <CommunityLinkItem key={c.id} community={c} />
            ))}
          {!isLoading && community.length === 0 && (
            <div>No communities found</div>
          )}
        </div>
      )}
    </div>
  );
}

function CommunityLinkItem({ community }: { community: Community }) {
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/community/${community.id}`);
  };
  return (
    <div
      onClick={onClickHandler}
      className="p-2 hover:bg-slate-200 cursor-pointer"
    >
      r/{community.name}
    </div>
  );
}
