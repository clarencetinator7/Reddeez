type Reply = {
  id: string;
  comment: string;
  commentedAt: string;
  user: User;
  upvotes: number;
  downvotes: number;
  votes: Vote[];
  replies: Reply[];
};
