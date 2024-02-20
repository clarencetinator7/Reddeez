<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Comment;
use App\Models\Community;
use App\Models\Member;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory()
            ->count(10)
            ->hasCommunity(1)
            ->hasJoinedCommunities(5)
            ->create();

        Community::factory()
            ->count(10)
            ->hasUser()
            ->has(Member::factory()->count(5))
            ->has(Post::factory()->count(10))
            ->create();

        // Member::factory()
        //     ->count(10)
        //     ->hasCommunity(1)
        //     ->hasUser(10)
        //     ->create();

        // Comment::factory()
        //     ->count(10)
        //     ->hasUser(1)
        //     ->has(Community::factory()
        //         ->count(1)
        //         ->hasMember(20))
        //     ->create();

        // Post::factory()
        //     ->count(10)
        //     ->create();
    }
}
