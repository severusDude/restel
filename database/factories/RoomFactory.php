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
        // 1. Coba gambar valid dari tipe yang sama
        $validImages = array_filter(static::$roomImages[$type] ?? [], function($imageUrl) {
            return $this->isImageValid($imageUrl);
        });
        if (!empty($validImages)) {
            $randomIndex = array_rand($validImages);
            return $validImages[$randomIndex];
        }

        // 2. Jika tidak ada, coba gambar default dari tipe yang sama
        if (isset(static::$defaultImages[$type]) && $this->isImageValid(static::$defaultImages[$type])) {
            return static::$defaultImages[$type];
        }

        // 3. Jika tidak ada, cari gambar valid dari tipe lain
        foreach (static::$roomImages as $otherType => $images) {
            if ($otherType === $type) continue;
            $otherValidImages = array_filter($images, function($imageUrl) {
                return $this->isImageValid($imageUrl);
            });
            if (!empty($otherValidImages)) {
                $randomIndex = array_rand($otherValidImages);
                return $otherValidImages[$randomIndex];
            }
        }

        // 4. Jika tetap tidak ada, coba default image dari tipe lain
        foreach (static::$defaultImages as $img) {
            if ($this->isImageValid($img)) {
                return $img;
            }
        }

        // 5. Jika semua gagal, tetap kembalikan gambar default dari tipe pertama (tidak placeholder)
        return reset(static::$defaultImages);
    }

    public function fromTemplate(string $type): static
    {
        $templates = [
            'Deluxe King' => [
                'capacity' => 2,
                'price' => rand(300000, 500000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Desk', 'Free WiFi', 'Air Conditioning', 'Swimming Pool', 'Room Service', 'Laundry Service'],
                'description' => 'Kamar mewah dengan tempat tidur king size, pemandangan kota yang menakjubkan, dan semua fasilitas premium untuk memastikan kenyamanan Anda selama menginap.',
            ],
            'Standard Twin' => [
                'capacity' => 2,
                'price' => rand(100000, 200000),
                'facilities' => ['Single Bed', 'Wardrobe', 'TV', 'Free WiFi', 'Air Conditioning', 'Wake-up Service'],
                'description' => 'Kamar nyaman dengan dua tempat tidur single, ideal untuk teman atau keluarga yang bepergian bersama dengan fasilitas dasar yang lengkap.',
            ],
            'Suite' => [
                'capacity' => 4,
                'price' => rand(400000, 500000),
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Wardrobe', 'Swimming Pool', 'Spa', 'Bar', 'Concierge', 'Airport Shuttle'],
                'description' => 'Suite mewah dengan ruang tamu terpisah, tempat tidur king size, dan berbagai layanan kelas atas. Cocok untuk mereka yang menginginkan pengalaman menginap terbaik.',
            ],
            'Family Room' => [
                'capacity' => 4,
                'price' => rand(350000, 450000),
                'facilities' => ['Queen Size Bed', 'Single Bed', 'TV', 'Wardrobe', 'Free WiFi', 'Air Conditioning', 'Swimming Pool', 'Room Service'],
                'description' => 'Kamar keluarga yang luas dengan dua tempat tidur, ideal untuk keluarga kecil. Dilengkapi dengan fasilitas yang nyaman untuk seluruh keluarga.',
            ],
            'Executive' => [
                'capacity' => 2,
                'price' => rand(400000, 500000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Desk', 'Free WiFi', 'Air Conditioning', 'Business Center', 'Concierge', 'Room Service'],
                'description' => 'Kamar eksekutif dengan ruang kerja terpisah, ideal untuk pebisnis yang membutuhkan kenyamanan dan produktivitas.',
            ],
            'Presidential' => [
                'capacity' => 4,
                'price' => rand(450000, 500000),
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Wardrobe', 'Swimming Pool', 'Spa', 'Bar', 'Concierge', 'Airport Shuttle', 'Private Butler'],
                'description' => 'Suite presidensial mewah dengan layanan butler pribadi, pemandangan terbaik, dan semua fasilitas premium untuk pengalaman menginap yang tak terlupakan.',
            ],
            'Single' => [
                'capacity' => 1,
                'price' => rand(100000, 150000),
                'facilities' => ['Single Bed', 'Wardrobe', 'TV', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar single yang nyaman untuk satu orang, dilengkapi dengan fasilitas dasar yang diperlukan.',
            ],
            'Double' => [
                'capacity' => 2,
                'price' => rand(150000, 250000),
                'facilities' => ['Double Bed', 'Wardrobe', 'TV', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar double dengan tempat tidur ukuran queen, cocok untuk pasangan atau teman yang bepergian bersama.',
            ],
            'Queen' => [
                'capacity' => 2,
                'price' => rand(200000, 300000),
                'facilities' => ['Queen Size Bed', 'TV', 'Wardrobe', 'Free WiFi', 'Air Conditioning', 'Room Service'],
                'description' => 'Kamar dengan tempat tidur queen size, menawarkan kenyamanan ekstra untuk pasangan.',
            ],
            'King' => [
                'capacity' => 2,
                'price' => rand(250000, 350000),
                'facilities' => ['King Size Bed', 'TV', 'Wardrobe', 'Free WiFi', 'Air Conditioning', 'Room Service'],
                'description' => 'Kamar dengan tempat tidur king size, memberikan kenyamanan maksimal untuk pasangan.',
            ],
            'Junior Suite' => [
                'capacity' => 3,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Room Service'],
                'description' => 'Suite junior dengan ruang tamu kecil, ideal untuk keluarga kecil atau rombongan kecil.',
            ],
            'Studio' => [
                'capacity' => 2,
                'price' => rand(200000, 300000),
                'facilities' => ['Queen Size Bed', 'TV', 'Kitchenette', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar studio dengan dapur kecil, cocok untuk tamu yang ingin memasak sendiri.',
            ],
            'Penthouse' => [
                'capacity' => 4,
                'price' => rand(450000, 500000),
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Minibar', 'Wardrobe', 'Swimming Pool', 'Spa', 'Bar', 'Concierge', 'Private Terrace'],
                'description' => 'Penthouse mewah dengan teras pribadi dan pemandangan kota yang menakjubkan.',
            ],
            'Cabana' => [
                'capacity' => 2,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Private Pool Access'],
                'description' => 'Kamar dengan akses langsung ke kolam renang pribadi, ideal untuk pasangan yang mencari privasi.',
            ],
            'Villa' => [
                'capacity' => 6,
                'price' => rand(400000, 500000),
                'facilities' => ['King Size Bed', 'Queen Size Bed', 'Single Bed', 'TV', 'Kitchen', 'Private Pool', 'Garden', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Villa pribadi dengan kolam renang dan taman, cocok untuk keluarga besar atau rombongan.',
            ],
            'Bungalow' => [
                'capacity' => 4,
                'price' => rand(350000, 450000),
                'facilities' => ['King Size Bed', 'Queen Size Bed', 'TV', 'Kitchen', 'Garden', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Bungalow dengan taman pribadi, menawarkan pengalaman menginap yang lebih intim.',
            ],
            'Loft' => [
                'capacity' => 3,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'Sofa', 'TV', 'Kitchen', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Loft dengan desain modern dan ruang yang luas, ideal untuk keluarga kecil.',
            ],
            'Apartment' => [
                'capacity' => 4,
                'price' => rand(350000, 450000),
                'facilities' => ['King Size Bed', 'Queen Size Bed', 'TV', 'Kitchen', 'Living Room', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Apartemen dengan dapur lengkap dan ruang tamu, cocok untuk menginap jangka panjang.',
            ],
            'Superior' => [
                'capacity' => 2,
                'price' => rand(250000, 350000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Room Service'],
                'description' => 'Kamar superior dengan fasilitas premium dan layanan kamar.',
            ],
            'Economy' => [
                'capacity' => 2,
                'price' => rand(100000, 200000),
                'facilities' => ['Double Bed', 'TV', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar ekonomi dengan fasilitas dasar, cocok untuk budget terbatas.',
            ],
            'Business' => [
                'capacity' => 2,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'Desk', 'TV', 'Free WiFi', 'Air Conditioning', 'Business Center', 'Room Service'],
                'description' => 'Kamar bisnis dengan ruang kerja dan akses ke pusat bisnis.',
            ],
            'Luxury' => [
                'capacity' => 2,
                'price' => rand(400000, 500000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Spa Bath', 'Free WiFi', 'Air Conditioning', 'Swimming Pool', 'Spa', 'Room Service'],
                'description' => 'Kamar mewah dengan bak mandi spa dan akses ke fasilitas premium.',
            ],
            'Classic' => [
                'capacity' => 2,
                'price' => rand(200000, 300000),
                'facilities' => ['Queen Size Bed', 'TV', 'Wardrobe', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar dengan desain klasik dan kenyamanan tradisional.',
            ],
            'Modern' => [
                'capacity' => 2,
                'price' => rand(250000, 350000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Smart Room Control'],
                'description' => 'Kamar dengan desain modern dan kontrol kamar pintar.',
            ],
            'Heritage' => [
                'capacity' => 2,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'TV', 'Antique Furniture', 'Free WiFi', 'Air Conditioning'],
                'description' => 'Kamar dengan desain heritage dan furnitur antik.',
            ],
            'Garden View' => [
                'capacity' => 2,
                'price' => rand(200000, 300000),
                'facilities' => ['King Size Bed', 'TV', 'Free WiFi', 'Air Conditioning', 'Garden Access'],
                'description' => 'Kamar dengan pemandangan taman yang indah.',
            ],
            'Sea View' => [
                'capacity' => 2,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Balcony'],
                'description' => 'Kamar dengan pemandangan laut yang menakjubkan.',
            ],
            'Mountain View' => [
                'capacity' => 2,
                'price' => rand(250000, 350000),
                'facilities' => ['King Size Bed', 'TV', 'Free WiFi', 'Air Conditioning', 'Balcony'],
                'description' => 'Kamar dengan pemandangan pegunungan yang menenangkan.',
            ],
            'Pool Access' => [
                'capacity' => 2,
                'price' => rand(300000, 400000),
                'facilities' => ['King Size Bed', 'TV', 'Minibar', 'Free WiFi', 'Air Conditioning', 'Direct Pool Access'],
                'description' => 'Kamar dengan akses langsung ke kolam renang.',
            ],
            'Balcony' => [
                'capacity' => 2,
                'price' => rand(200000, 300000),
                'facilities' => ['King Size Bed', 'TV', 'Free WiFi', 'Air Conditioning', 'Private Balcony'],
                'description' => 'Kamar dengan balkon pribadi untuk menikmati pemandangan.',
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

        $template = $templates[$type] ?? [
            'capacity' => 2,
            'price' => rand(100000, 500000),
            'facilities' => ['King Size Bed', 'TV', 'Free WiFi', 'Air Conditioning'],
            'description' => 'Kamar nyaman dengan fasilitas standar.',
        ];

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
