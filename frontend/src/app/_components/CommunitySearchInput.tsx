"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function CommunitySearchInput() {
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 500);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (query) {
      router.push(`${path}/?search=${query}`);
    } else {
      router.push(path);
    }
  }, [query, router, path]);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Input
      type="text"
      onChange={onInputChangeHandler}
      placeholder="Search Community"
      className=""
    />
  );
}
