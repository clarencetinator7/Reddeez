type Post = {
  id: string;
  title: string;
  body: string;
  communityId: string;
  upvotes: number;
  downvotes: number;
  votes: Vote[];
  postedBy: User;
  community: Community;
  comments?: Reply[];
  commentCount?: number;
  createdAt: string;
};
