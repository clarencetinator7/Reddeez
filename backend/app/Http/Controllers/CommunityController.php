<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

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

    public function updateDescription(Request $request)
    {
        $validateData = $request->validate([
            'description' => 'required|string|max:255'
        ]);

        // Find the community of user
        $user = User::findOrfail(auth()->id());
        $community = $user->community()->findOrfail($request->id);

        // Check if community exists
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $community->update([
            'description' => $validateData['description']
        ]);
        $community->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Community found',
            'data' => $community
        ], 200);
    }

    public function getCommunityMembers(Request $request)
    {
        $members = Community::findOrfail($request->id)->members;

        return response()->json([
            'status' => 'success',
            'message' => 'Community members found',
            'data' => new UserCollection($members)
            // 'data' => $members
        ], 200);
    }
}
