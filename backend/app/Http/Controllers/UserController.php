<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommunityCollection;
use App\Http\Resources\CommunityResource;
use App\Http\Resources\UserResource;
use App\Models\Community;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function getUserProfile(Request $request)
    {
        $username = $request->username;

        $includePost = $request->query('includePost');

        $user = User::where('username', $username);

        if ($includePost) {
            $user->with('post');
        }

        if ($user) {
            return response()->json([
                'status' => 'success',
                'message' => 'User found',
                'data' => new UserResource($user->first())
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }

    public function getUserWithId(Request $request)
    {
        $id = $request->id;

        $user = User::where('id', $id);

        if ($user) {
            return response()->json([
                'status' => 'success',
                'message' => 'User found',
                'data' => new UserResource($user->first())
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }

    public function getUserCommunities(Request $request)
    {
        // $user = Auth::user();

        $user = User::findOrFail($request->id)->joinedCommunities;

        return response()->json([
            'status' => 'success',
            'message' => 'User communities found',
            // 'data' => new CommunityCollection($community)
            'data' => $user
        ], 200);
    }
}
