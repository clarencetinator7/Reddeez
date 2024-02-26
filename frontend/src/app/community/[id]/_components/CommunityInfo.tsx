import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { getCommunityById } from "@/services/community";

export default async function CommunityInfo({ id }: { id: string }) {
  const community: Community = await getCommunityById(id);
  return (
    <Card className="w-[300px] top-[80px] sticky">
      <CardHeader>
        <CardDescription className="text-sm">
          {community.description}
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="p-5">
        <div className="flex flex-row justify-center gap-6">
          <div>
            <span className="text-xl font-bold">{community.membersCount}</span>
            <p className="text-sm">Members</p>
          </div>
          <div>
            <span className="text-xl font-bold">{community.postsCount}</span>
            <p className="text-sm">Posts</p>
          </div>
          <div>
            <span className="text-lg font-bold">
              {moment(community.createdAt).format("MMM YYYY")}
            </span>
            <p className="text-sm">Date Created</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
