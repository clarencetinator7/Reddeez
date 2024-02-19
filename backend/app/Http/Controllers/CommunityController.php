<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use App\Http\Resources\CommunityCollection;
use App\Http\Resources\PostCollection;
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

    public function getCommunityPosts(Request $request)
    {
        $posts = Community::findOrfail($request->id)->post()->with('user');

        return new PostCollection($posts->paginate(5));
    }

    public function joinCommunity(Request $request)
    {
        $user = User::findOrfail(auth()->id());
        $community = Community::findOrfail($request->id);

        // Check if the user owns the community        
        if ($user->community()->find($community->id)) {
            return response()->json([
                'success' => false,
                'message' => 'User is the owner of the community'
            ], 400);
        }

        // Check if the user is already a member of the community
        if ($community->members()->find($user->id)) {
            return response()->json([
                'success' => false,
                'message' => 'User already in community'
            ], 400);
        }

        $community->members()->attach($user->id);

        return response()->json([
            'success' => true,
            'message' => 'User joined community',
        ], 200);
    }

    public function leaveCommunity(Request $request)
    {
        $user = User::findOrfail(auth()->id());
        $community = Community::findOrfail($request->id);

        if ($user->community()->find($community->id)) {
            return response()->json([
                'success' => false,
                'message' => 'You can\'t leave a community you own'
            ], 400);
        }

        if (!$community->members()->find($user->id)) {
            return response()->json([
                'success' => false,
                'message' => 'User is not a member of the community'
            ], 400);
        }

        $user->joinedCommunities()->detach($community->id);

        return response()->json([
            'success' => true,
            'message' => 'User left community',
        ], 200);
    }
}
