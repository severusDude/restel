<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    protected static array $availableLocations = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }

    public function fromTemplate(string $type): static
    {
        $templates = [
            'Deluxe King' => [
                'capacity' => 2,
                'price' => 200,
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Desk', 'Free WiFi', 'Air Conditioning', 'Swimming Pool', 'Room Service', 'Laundry Service'],
            ],
            'Standard Twin' => [
                'capacity' => 2,
                'price' => 120,
                'facilities' => ['Single Bed', 'Wardrobe', 'TV', 'Free WiFi', 'Air Conditioning', 'Wake-up Service'],
            ],
            'Suite' => [
                'capacity' => 4,
                'price' => 350,
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Wardrobe', 'Swimming Pool', 'Spa', 'Bar', 'Concierge', 'Airport Shuttle'],
            ],
        ];

        // Generate the pool of available locations if not already done
        if (empty(static::$availableLocations)) {
            $floors = range(1, 9); // Floor 1–9
            $roomsPerFloor = range(1, 20); // Rooms 01–20 per floor

            foreach ($floors as $floor) {
                foreach ($roomsPerFloor as $roomNum) {
                    static::$availableLocations[] = sprintf('%d%02d', $floor, $roomNum);
                }
            }

            shuffle(static::$availableLocations); // Randomize
        }

        $template = $templates[$type];

        return $this->state(function () use ($type, $template) {
            $location = array_pop(static::$availableLocations);

            return [
                'name' => $type,
                'type' => $type,
                'capacity' => $template['capacity'],
                'price' => $template['price'],
                'location' => $location
            ];
        })->afterCreating(function (Room $room) use ($template) {
            $facilityIds = Facility::whereIn('name', $template['facilities'])->pluck('id');
            $room->facilities()->sync($facilityIds);
        });
    }
}
