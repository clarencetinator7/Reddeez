<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id'
    ];

    public function userOwner()
    {
        return $this->belongsTo(User::class);
    }

    // public function member()
    // {
    //     return $this->hasMany(Member::class);
    // }

    public function members()
    {
        return $this->belongsToMany(User::class, 'members', 'community_id', 'user_id');
    }

    public function post()
    {
        return $this->hasMany(Post::class);
    }
}
