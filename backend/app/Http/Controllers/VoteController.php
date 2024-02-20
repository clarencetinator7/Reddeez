<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function voteOnVoteable(Request $request)
    {
        $request->validate([
            'voteStatus' => 'required|string|in:u,d',
            'type' => 'required|string|in:post,comment'
        ]);

        $status = null;
        $voteable = null;

        if ($request->voteStatus === 'u') {
            $status = 'U';
        } else if ($request->voteStatus === 'd') {
            $status = 'D';
        }

        if ($request->type === 'post') {
            $voteable = Post::find($request->id);
        } else if ($request->type === 'comment') {
            $voteable = Comment::find($request->id);
        }

        $user = User::findOrfail(auth()->id());

        if (!$voteable) {
            return response()->json([
                'success' => false,
                'message' => 'Voteable not found'
            ], 404);
        }

        // Check if the user has already voted on the post
        $existingVote = $voteable->votes()->where('user_id', $user->id)->first();

        if ($existingVote) {
            // Check if same with the existing vote
            if ($existingVote->status === $status) {
                $existingVote->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Vote removed'
                ], 200);
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
            $voteable->votes()->create([
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
