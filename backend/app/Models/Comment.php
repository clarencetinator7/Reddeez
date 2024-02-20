<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'body',
        'commentable_id',
        'commentable_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    // Polymorphic relationship to self
    public function children() // Replies
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function replies()
    {
        return $this->children()->with('replies');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'voteable');
    }
}
