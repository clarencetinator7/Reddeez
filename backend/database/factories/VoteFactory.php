<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        // Random parent id
        $parent_id = rand(1, 2) === 1 ? Comment::inRandomOrder()->first()->id : Post::inRandomOrder()->first()->id;

        return [
            'user_id' => User::factory(),
            'parent_id' => $parent_id,
            'parent_type' => $parent_id === Comment::class ? 'C' : 'P',
            'status' => $this->faker->randomElement(['U', 'D']),
        ];
    }
}
