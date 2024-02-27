type Post = {
  id: string;
  title: string;
  body: string;
  communityId: string;
  upvotes: number;
  downvotes: number;
  postedBy: User; // User type here
};
