<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\City;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ],
        );

        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
                'phone' => '+40700000000',
            ],
        );

        $categories = collect(['Apartamente', 'Case', 'Terenuri', 'Spatii comerciale'])
            ->map(fn ($name) => Category::firstOrCreate([
                'slug' => Str::slug($name),
            ], [
                'name' => $name,
            ]));

        $cities = collect([
            ['name' => 'Bucuresti', 'county' => 'Bucuresti'],
            ['name' => 'Cluj-Napoca', 'county' => 'Cluj'],
            ['name' => 'Timisoara', 'county' => 'Timis'],
            ['name' => 'Iasi', 'county' => 'Iasi'],
        ])->map(fn ($city) => City::firstOrCreate([
            'slug' => Str::slug($city['name']),
        ], $city));

        foreach (range(1, 12) as $index) {
            Property::firstOrCreate([
                'title' => "Apartament demo {$index}",
            ], [
                'user_id' => $index % 2 ? $admin->id : $user->id,
                'category_id' => $categories->random()->id,
                'city_id' => $cities->random()->id,
                'description' => 'Locuinta luminoasa, aproape de transport public, magazine si zone verzi.',
                'price' => rand(45000, 220000),
                'currency' => 'EUR',
                'address' => 'Strada Exemplu '.$index,
                'rooms' => rand(1, 5),
                'surface' => rand(35, 140),
                'status' => Property::STATUS_APPROVED,
            ]);
        }
    }
}
