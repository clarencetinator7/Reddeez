<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use App\Models\User;

class CommunityController extends Controller
{

    public function createCommunity(StoreCommunityRequest $request)
    {

        $user = User::findOrfail(auth()->id());

        $community = $user->community()->create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Community created',
            'data' => $community
        ], 201);
    }
}
