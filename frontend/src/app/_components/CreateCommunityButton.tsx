import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateCommunityDialog from "./CreateCommunityDialog";

export default function CreateCommunityButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          Create Community
        </Button>
      </DialogTrigger>
      <CreateCommunityDialog />
    </Dialog>
  );
}
