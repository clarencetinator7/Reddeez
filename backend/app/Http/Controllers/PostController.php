<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostCollection;
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

        $post = Post::with(['user', 'votes', 'community'])->find($request->id)->loadCount(['votes as upvotes' => function ($query) {
            $query->where('status', 'U');
        }, 'votes as downvotes' => function ($query) {
            $query->where('status', 'D');
        }]);

        if ($includeComments) {
            // Include comments and replies recursively
            $post->load(['comment' => function ($query) {
                $query->with('user')->with('votes')->with('replies')->withCount(['votes as upvotes' => function ($query) {
                    $query->where('status', 'U');
                }, 'votes as downvotes' => function ($query) {
                    $query->where('status', 'D');
                }]);
            }]);
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
            // 'data' => $post,
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

    public function generateFeed()
    {
        $user = User::findOrfail(auth()->id());

        $communities = $user->joinedCommunities()->get();

        $userCommunity = $user->community()->get();

        $communities = $communities->merge($userCommunity);

        $posts = Post::with(['user', 'votes', 'community'])->whereIn('community_id', $communities->pluck('id'))->withCount(['votes as upvotes' => function ($query) {
            $query->where('status', 'U');
        }, 'votes as downvotes' => function ($query) {
            $query->where('status', 'D');
        }])->orderBy('created_at', 'desc')->orderBy('upvotes', 'desc');

        return new PostCollection($posts->paginate(10));
    }

    public function generateFeedNoAuth()
    {
        $posts = Post::with(['user', 'votes', 'community'])->withCount(['votes as upvotes' => function ($query) {
            $query->where('status', 'U');
        }, 'votes as downvotes' => function ($query) {
            $query->where('status', 'D');
        }])->orderBy('created_at', 'desc')->orderBy('upvotes', 'desc');

        return new PostCollection($posts->paginate(10));
    }
}
