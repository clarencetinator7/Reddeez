<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public function updateDisplayName(Request $request)
    {

        $validatedData = $request->validate([
            'displayName' => 'required|string'
        ]);

        $user = User::findOrFail(Auth::id());

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        if ($user->display_name === $validatedData['displayName']) {
            return response()->json([
                'success' => false,
                'message' => 'Display name is the same'
            ], 400);
        }

        $user->display_name = $validatedData['displayName'];
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Display name updated',
            'data' => new UserResource($user)
        ], 200);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = User::findOrFail(Auth::id());

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }



        if ($request->hasFile('avatar')) {

            if ($user->avatar) {
                // $avatarPath = storage_path('app/public/avatars/' . $user->id . '/' . $user->avatar);
                $avatarPath = storage_path('app/public/' . $user->avatar);
                if (file_exists($avatarPath)) {
                    unlink($avatarPath);
                }
            }

            $avatar = $request->file('avatar');
            $avatar = Storage::disk('public')->put('avatars/' . $user->id, $avatar);

            $user->avatar = $avatar;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Avatar updated',
                'data' => new UserResource($user)
            ], 200);
        }
    }
}
