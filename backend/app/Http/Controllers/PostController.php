<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
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

    public function editPost(UpdatePostRequest $request)
    {
        $user = User::findOrfail(auth()->id());
        $post = $user->post()->find($request->id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }

        $postUpdated = $post->update($request->all());

        if ($postUpdated) {
            return response()->json([
                'success' => true,
                'message' => 'Post updated',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Post could not be updated'
            ], 500);
        }
    }

    public function getPost(Request $request)
    {

        $includeComments = request()->query('includeComments', false);

        $post = Post::with('user')->find($request->id);

        if ($includeComments) {
            // Include comments and replies recursively
            $post->load('comment.replies');
        }

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

        return response()->json([
            'success' => true,
            'message' => 'Post archived'
        ], 200);
    }

    public function voteOnPost(Request $request)
    {
        $voteStatus = $request->voteStatus;
        $status = '';

        if ($voteStatus === 'u') {
            $status = 'U';
        } else if ($voteStatus === 'd') {
            $status = 'D';
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid vote status'
            ], 400);
        }

        $user = User::findOrfail(auth()->id());
        $post = Post::find($request->id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }

        // Check if the user has already voted on the post
        $existingVote = $post->votes()->where('user_id', $user->id)->first();
        // if($existingVote['status'] === $status) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'You have already voted'
        //     ], 400);
        // } else {

        // }

        if ($existingVote) {
            // Check if same with the existing vote
            if ($existingVote->status === $status) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already voted'
                ], 400);
            } else {
                $existingVote->update([
                    'status' => $status
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Vote updated'
                ], 200);
            }
        } else {
            // Create new record if user has not voted
            $post->votes()->create([
                'user_id' => $user->id,
                'status' => $status
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Vote created'
            ], 201);
        }
    }
}
