<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function commentOnPost(Request $request)
    {
        $validatedData = $request->validate([
            'body' => 'required',
        ]);

        $post = Post::find($request->id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }

        $comment = $post->comment()->create([
            'user_id' => auth()->id(),
            'body' => $validatedData['body'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Comment created',
            'data' => $comment
        ], 201);
    }

    public function replyToComment(Request $request)
    {
        $validatedData = $request->validate([
            'body' => 'required',
        ]);

        $comment = Comment::find($request->id);

        if (!$comment) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not found'
            ], 404);
        }

        $reply = $comment->children()->create([
            'user_id' => auth()->id(),
            'body' => $validatedData['body'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reply created',
            'data' => $reply
        ], 201);
    }
}
