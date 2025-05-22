<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles if they don't exist
        if (!Role::where('name', 'admin')->exists()) {
            Role::create(['name' => 'admin']);
        }
        
        if (!Role::where('name', 'guest')->exists()) {
            Role::create(['name' => 'guest']);
        }

        // Admin user
        $admin = User::create([
            'name' => "Admin ResTel",
            'email' => "admin@restel.com",
            'password' => Hash::make("admin123"),
            'email_verified_at' => now()
        ]);
        $admin->assignRole('admin');

        // Sample guest users
        $guestUsers = [
            [
                'name' => "Budi Santoso",
                'email' => "budi@example.com",
                'password' => "password123",
            ],
            [
                'name' => "Dewi Lestari",
                'email' => "dewi@example.com",
                'password' => "password123",
            ],
            [
                'name' => "Ahmad Rasyid",
                'email' => "ahmad@example.com",
                'password' => "password123",
            ],
            [
                'name' => "Siti Rahayu",
                'email' => "siti@example.com",
                'password' => "password123",
            ],
            [
                'name' => "Rina Maulida",
                'email' => "rina@example.com",
                'password' => "password123",
            ],
        ];

        foreach ($guestUsers as $guestData) {
            $guest = User::create([
                'name' => $guestData['name'],
                'email' => $guestData['email'],
                'password' => Hash::make($guestData['password']),
                'email_verified_at' => now()
            ]);
            $guest->assignRole('guest');
        }

        // Create additional random users if needed
        User::factory(10)->create()->each(function ($user) {
            $user->assignRole('guest');
        });
    }
}
