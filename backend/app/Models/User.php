<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'display_name',
        'email',
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function community()
    {
        return $this->hasMany(Community::class);
    }

    public function joinedCommunities()
    {
        return $this->belongsToMany(Community::class, 'members', 'user_id', 'community_id');
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }

    public function post()
    {
        return $this->hasMany(Post::class);
    }

    public function vote()
    {
        return $this->hasMany(Vote::class);
    }
}
