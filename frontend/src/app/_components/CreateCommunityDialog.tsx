import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCommunityDialog() {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Create a Community</DialogTitle>
        <DialogDescription>
          Communities are great for hosting discussions, posting articles,
          finding support, and more.
        </DialogDescription>
      </DialogHeader>
      <div>
        <form>
          <div className="mb-2">
            <Label htmlFor="communityName">Community Name</Label>
            <Input
              type="text"
              id="communityName"
              name="communityName"
              placeholder="Community Name"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="communityDescription">Description</Label>
            <Textarea
              id="communityDescription"
              name="communityDescription"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button type="button" variant="secondary" className="mt-5">
              Cancel
            </Button>
            <Button type="submit" className="mt-5">
              Create
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
