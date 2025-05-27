<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use App\Models\Room;
use App\Models\User;
use App\Models\Reservation;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all available rooms and active users
        $rooms = Room::available()->get();
        $users = User::all();

        if ($rooms->isEmpty() || $users->isEmpty()) {
            $this->command->info(
                'No available rooms or active users found. Skipping reservation seeding.'
            );
            return;
        }

        // Create 10-20 random reservations
        $reservationCount = rand(10, 20);

        for ($i = 0; $i < $reservationCount; $i++) {
            $user = $users->random();
            $startDate = Carbon::now()->addDays(rand(1, 30));
            $endDate = (clone $startDate)->addDays(rand(1, 14));

            // Random status (weighted toward confirmed)
            $status = $this->randomStatus();

            $reservation = Reservation::create([
                'user_id' => $user->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => $status,
                'status_date' => $status !== 'pending' ? now() : null,
            ]);

            // Add 1-3 random rooms to the reservation
            $roomCount = rand(1, min(3, $rooms->count()));
            $selectedRooms = $rooms->random($roomCount);

            foreach ($selectedRooms as $room) {
                $reservation->items()->create([
                    'reservable_id' => $room->id,
                    'reservable_type' => get_class($room),
                    'price' => $room->price,
                ]);
            }

            // Calculate and update total price
            // $reservation->update([
            //     'total_price' => $reservation->items->sum('price')
            // ]);
            $reservation->update();
        }

        $this->command->info("\tCreated {$reservationCount} reservations with items.");
    }

    protected function randomStatus(): string
    {
        $statuses = [
            'pending' => 2,
            'confirmed' => 5,
            'cancelled' => 1,
            'success' => 3,
        ];

        $total = array_sum($statuses);
        $rand = rand(1, $total);

        foreach ($statuses as $status => $weight) {
            $rand -= $weight;
            if ($rand <= 0) {
                return $status;
            }
        }

        return 'pending';
    }
}
