<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = [
            // Amenities
            ['name' => 'Swimming Pool', 'type' => 'amenity'],
            ['name' => 'Spa', 'type' => 'amenity'],
            ['name' => 'Fitness Center', 'type' => 'amenity'],
            ['name' => 'Restaurant', 'type' => 'amenity'],
            ['name' => 'Bar', 'type' => 'amenity'],
            ['name' => 'Free WiFi', 'type' => 'amenity'],
            ['name' => 'Parking', 'type' => 'amenity'],
            ['name' => 'Air Conditioning', 'type' => 'amenity'],
            ['name' => '24-Hour Front Desk', 'type' => 'amenity'],

            // Furniture
            ['name' => 'King Size Bed', 'type' => 'furniture'],
            ['name' => 'Queen Size Bed', 'type' => 'furniture'],
            ['name' => 'Single Bed', 'type' => 'furniture'],
            ['name' => 'Sofa', 'type' => 'furniture'],
            ['name' => 'Desk', 'type' => 'furniture'],
            ['name' => 'Wardrobe', 'type' => 'furniture'],
            ['name' => 'TV', 'type' => 'furniture'],
            ['name' => 'Minibar', 'type' => 'furniture'],
            ['name' => 'Safe Deposit Box', 'type' => 'furniture'],

            // Services
            ['name' => 'Room Service', 'type' => 'service'],
            ['name' => 'Laundry Service', 'type' => 'service'],
            ['name' => 'Airport Shuttle', 'type' => 'service'],
            ['name' => 'Concierge', 'type' => 'service'],
            ['name' => 'Tour Desk', 'type' => 'service'],
            ['name' => 'Business Center', 'type' => 'service'],
            ['name' => 'Meeting Facilities', 'type' => 'service'],
            ['name' => 'Babysitting', 'type' => 'service'],
            ['name' => 'Wake-up Service', 'type' => 'service'],
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
