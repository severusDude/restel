<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        // seed from factory
        // Room::factory()->count(5)->fromTemplate('Deluxe King')->create();
        // Room::factory()->count(10)->fromTemplate('Standard Twin')->create();
        // Room::factory()->count(30)->fromTemplate('Suite')->create();
        
        // seed only 5 type room
        $rooms = [
            [
                'name' => 'Deluxe King Room',
                'slug' => 'deluxe-king',
                'description' => 'Kamar luas dengan ranjang king',
                'type' => 'deluxe',
                'capacity' => 2,
                'location' => 'Lantai 3',
                'price' => 750000,
            ],
            [
                'name' => 'Family Suite',
                'slug' => 'family-suite',
                'description' => 'Kamar besar untuk keluarga',
                'type' => 'suite',
                'capacity' => 4,
                'location' => 'Lantai 5',
                'price' => 1200000,
            ],
            [
                'name' => 'Superior Twin Room',
                'slug' => 'superior-twin',
                'description' => 'Cocok untuk 2 orang teman/saudara',
                'type' => 'superior',
                'capacity' => 2,
                'location' => 'Lantai 2',
                'price' => 650000,
            ],
            [
                'name' => 'Executive Suite',
                'slug' => 'executive-suite',
                'description' => 'Kamar mewah untuk bisnis & liburan',
                'type' => 'suite',
                'capacity' => 3,
                'location' => 'Lantai 6',
                'price' => 1500000,
            ],
            [
                'name' => 'Budget Single Room',
                'slug' => 'budget-single',
                'description' => 'Kamar hemat untuk 1 orang',
                'type' => 'standard',
                'capacity' => 1,
                'location' => 'Lantai 1',
                'price' => 400000,
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
