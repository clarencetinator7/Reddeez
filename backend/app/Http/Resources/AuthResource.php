<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'success' => true,
            'message' => 'User created successfully',
            'user' => [
                'id' => $this->id,
                'username' => $this->username,
                'email' => $this->email,
            ]
        ];
    }
}
