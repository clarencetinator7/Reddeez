<?php

namespace App\Http\Resources;

use App\Models\Community;
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
            'userId' => $this->user_id,
            'communityId' => $this->community_id,
            // 'user' => new UserResource($this->user),
            // 'community' => Community::find($this->community_id),
        ];
    }
}
