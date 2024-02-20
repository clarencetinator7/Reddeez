<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Community;

class PostController extends Controller
{

    public function createPost(StorePostRequest $request)
    {
        $community = Community::find($request->communityId);

        if (!$community) {
            return response()->json([
                'success' => false,
                'message' => 'Community not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Post created',
            'data' => new PostResource(Post::create($request->all()))
        ], 201);
    }
}
