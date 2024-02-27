<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'communityId' => $this->community_id,
            'upvotes' => $this->upvotes,
            'downvotes' => $this->downvotes,
            'votes' => new VoteCollection($this->whenLoaded('votes')),
            'postedBy' => new UserResource($this->whenLoaded('user')),
            'community' => new CommunityResource($this->whenLoaded('community')),
            'comments' => CommentResource::collection($this->whenLoaded('comment')),
            'createdAt' => $this->created_at,
        ];
    }
}
