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
        // Any logic needed when a reservation is created
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
        // Handle status changes
        if ($reservation->isDirty('status')) {
            $oldStatus = $reservation->getOriginal('status');
            $newStatus = $reservation->status;
            
            // Logic for different status transitions
            if ($oldStatus === 'pending' && $newStatus === 'confirmed') {
                // Maybe send confirmation email or notification
            } elseif ($newStatus === 'cancelled') {
                // Handle cancellation logic
            }
        }

        if ($reservation->relationLoaded('items') && $reservation->items->isNotEmpty()) {
            $reservation->updateTotalPrice();
        }
    }

    /**
     * Handle the Reservation "deleted" event.
     */
    public function deleted(Reservation $reservation): void
    {
        // Any cleanup needed when a reservation is deleted
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
