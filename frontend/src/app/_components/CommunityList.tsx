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
      </CollapsibleContent>
    </Collapsible>
  );
}
