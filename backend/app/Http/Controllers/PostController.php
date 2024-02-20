<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Community;
use App\Models\User;
use Illuminate\Http\Request;

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

    public function getPost(Request $request)
    {
        $post = Post::find($request->id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Post found',
            'data' => new PostResource($post)
        ], 200);
    }

    public function archivePost(Request $request)
    {
        $user = User::findOrfail(auth()->id());
        $post = $user->post()->find($request->id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Post archived'
        ], 200);
    }
}
