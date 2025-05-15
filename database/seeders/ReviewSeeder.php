<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Review;
use App\Models\ReservationItem;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::has('reservations')->get();

        // Get reservation items that don't already have reviews
        $reservationItems = ReservationItem::whereDoesntHave('review')->get();

        // Create reviews for a subset of reservation items
        $reservationItems->each(function ($item) use ($users) {
            // Skip randomly some items
            if (rand(0, 3) === 0) { // ~25% chance to skip
                return;
            }

            Review::factory()->create([
                'user_id' => $item->reservation->user_id,
                'reservation_item_id' => $item->id,
            ]);
        });
    }
}
