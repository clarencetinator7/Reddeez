type Vote = {
  userId: string;
  voteableId: string;
  voteableType: string;
  status: "U" | "D";
  createdAt: string;
};
