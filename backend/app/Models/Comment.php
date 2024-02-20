<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    // Polymorphic relationship to self
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function children() // Replies
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
