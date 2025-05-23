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
    $types = [
        'Deluxe King', 'Standard Twin', 'Suite', 'Family Room', 'Executive', 'Presidential', 'Single', 'Double',
        'Queen', 'King', 'Junior Suite', 'Studio', 'Penthouse', 'Cabana', 'Villa', 'Bungalow', 'Loft', 'Apartment',
        'Superior', 'Economy', 'Business', 'Luxury', 'Classic', 'Modern', 'Heritage', 'Garden View', 'Sea View',
        'Mountain View', 'Pool Access', 'Balcony'
    ];

    foreach ($types as $type) {
        \App\Models\Room::factory()->fromTemplate($type)->create();
    }
}
}
