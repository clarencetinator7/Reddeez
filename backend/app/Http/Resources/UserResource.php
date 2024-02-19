<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'displayName' => $this->display_name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'post' => PostResource::collection($this->whenLoaded('post')),
            'pivot' => $this->whenPivotLoaded('members', function () {
                return [
                    'communityId' => $this->pivot->community_id,
                    'joineDate' => $this->pivot->created_at,
                ];
            }),
        ];
    }
}
