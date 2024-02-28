type Comment = {
  id: string;
  comment: string;
  commentedAt: string;
  user: User;
  upvotes: number;
  downvotes: number;
  votes: Vote[];
  replies: Comment[];
};
