<?php

namespace App\Observers;

use App\Models\Reservation;

class ReservationObserver
{
    /**
     * Handle the Reservation "created" event.
     */
    public function created(Reservation $reservation): void
    {
        //
    }

    // Handle the "updating" event
    public function updating(Reservation $reservation): void
    {
        if ($reservation->isDirty('status')) {
            $reservation->status_date = now();
        }
    }

    /**
     * Handle the Reservation "updated" event.
     */
    public function updated(Reservation $reservation): void
    {
        if ($reservation->relationLoaded('items') && $reservation->items->isNotEmpty()) {
            $reservation->updateTotalPrice();
        }
    }

    /**
     * Handle the Reservation "deleted" event.
     */
    public function deleted(Reservation $reservation): void
    {
        //
    }

    /**
     * Handle the Reservation "restored" event.
     */
    public function restored(Reservation $reservation): void
    {
        //
    }

    /**
     * Handle the Reservation "force deleted" event.
     */
    public function forceDeleted(Reservation $reservation): void
    {
        //
    }

    // Also handle when items are changed through relations
    public function saved(Reservation $reservation): void
    {
        if ($reservation->relationLoaded('items') && $reservation->items->isNotEmpty()) {
            $reservation->updateTotalPrice();
        }
    }
}
