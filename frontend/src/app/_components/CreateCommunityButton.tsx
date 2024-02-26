"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { useState } from "react";

export default function CreateCommunityButton() {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          Create Community
        </Button>
      </DialogTrigger>
      <CreateCommunityDialog onCloseHandler={onCloseHandler} />
    </Dialog>
  );
}
