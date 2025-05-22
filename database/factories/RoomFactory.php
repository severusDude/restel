<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    protected static array $availableLocations = [];

    // Koleksi gambar untuk masing-masing tipe kamar
    protected static array $roomImages = [
        'Deluxe King' => [
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        ],
        'Standard Twin' => [
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80',
            'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1619789393863-aa02c774cbd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        ],
        'Suite' => [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        ],
    ];

    // Gambar default jika semua gambar tidak tersedia
    protected static array $defaultImages = [
        'Deluxe King' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
        'Standard Twin' => 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
        'Suite' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ];

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

    /**
     * Periksa apakah URL gambar valid (tidak 404)
     */
    protected function isImageValid(string $imageUrl): bool
    {
        try {
            $response = Http::head($imageUrl);
            return $response->successful();
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Dapatkan gambar yang valid untuk tipe kamar
     */
    protected function getValidImageForRoomType(string $type): string
    {
        // Filter array gambar untuk hanya mendapatkan yang valid
        $validImages = array_filter(static::$roomImages[$type], function($imageUrl) {
            return $this->isImageValid($imageUrl);
        });

        // Jika ada gambar valid, pilih salah satu secara acak
        if (!empty($validImages)) {
            $randomIndex = array_rand($validImages);
            return $validImages[$randomIndex];
        }

        // Jika tidak ada gambar valid, coba gunakan default image
        if ($this->isImageValid(static::$defaultImages[$type])) {
            return static::$defaultImages[$type];
        }

        // Jika default image juga tidak valid, gunakan placeholder
        return 'https://placehold.co/600x400?text=' . urlencode($type);
    }

    public function fromTemplate(string $type): static
    {
        $templates = [
            'Deluxe King' => [
                'capacity' => 2,
                'price' => 200,
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Desk', 'Free WiFi', 'Air Conditioning', 'Swimming Pool', 'Room Service', 'Laundry Service'],
                'description' => 'Kamar mewah dengan tempat tidur king size, pemandangan kota yang menakjubkan, dan semua fasilitas premium untuk memastikan kenyamanan Anda selama menginap.',
            ],
            'Standard Twin' => [
                'capacity' => 2,
                'price' => 120,
                'facilities' => ['Single Bed', 'Wardrobe', 'TV', 'Free WiFi', 'Air Conditioning', 'Wake-up Service'],
                'description' => 'Kamar nyaman dengan dua tempat tidur single, ideal untuk teman atau keluarga yang bepergian bersama dengan fasilitas dasar yang lengkap.',
            ],
            'Suite' => [
                'capacity' => 4,
                'price' => 350,
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Wardrobe', 'Swimming Pool', 'Spa', 'Bar', 'Concierge', 'Airport Shuttle'],
                'description' => 'Suite mewah dengan ruang tamu terpisah, tempat tidur king size, dan berbagai layanan kelas atas. Cocok untuk mereka yang menginginkan pengalaman menginap terbaik.',
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

        // Dapatkan gambar valid untuk tipe kamar ini
        $featuredImage = $this->getValidImageForRoomType($type);

        return $this->state(function () use ($type, $template, $featuredImage) {
            $location = array_pop(static::$availableLocations);

            return [
                'name' => $type,
                'slug' => \Illuminate\Support\Str::slug($type) . '-' . $location,
                'description' => $template['description'],
                'type' => $type,
                'capacity' => $template['capacity'],
                'price' => $template['price'],
                'location' => $location,
                'featured_image' => $featuredImage,
            ];
        })->afterCreating(function (Room $room) use ($template) {
            $facilityIds = Facility::whereIn('name', $template['facilities'])->pluck('id');
            $room->facilities()->sync($facilityIds);
        });
    }
}
