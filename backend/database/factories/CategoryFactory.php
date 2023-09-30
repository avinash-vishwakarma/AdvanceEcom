<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $name = fake()->word();
        $slug = strtolower($name);

        return [
            'name'=>$name,
            'slug'=>$slug,
            'icon'=>"bi bi-alarm-fill"
        ];
    }
}
