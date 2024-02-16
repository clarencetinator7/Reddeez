<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

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
}
