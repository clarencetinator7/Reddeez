<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoteResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      "userId" => $this->user_id,
      "voteableId" => $this->voteable_id,
      "voteableType" => $this->voteable_type,
      "status" => $this->status,
      "createdAt" => $this->created_at,
    ];
  }
}
