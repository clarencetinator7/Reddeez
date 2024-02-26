"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { RxCaretSort } from "react-icons/rx";

type CommunityListProps = {
  communities: Community[];
  children: React.ReactNode;
};

export default function CommunityList({
  communities,
  children,
}: CommunityListProps) {
  return (
    <Collapsible defaultOpen>
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-gray-500 tracking-wide">{children}</h4>
        <CollapsibleTrigger asChild>
          <Button variant={"ghost"} size="sm">
            <RxCaretSort />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col">
          {communities.map((community) => {
            return (
              <Link
                key={community.id}
                className="p-2 rounded hover:bg-slate-200 transition-all duration-200 cursor-pointer"
                href={`/community/${community.id}`}
                prefetch={false}
              >
                n/{community.name}
              </Link>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
