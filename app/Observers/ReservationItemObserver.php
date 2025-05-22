<?php

namespace App\Observers;

use App\Models\ReservationItem;

class ReservationItemObserver
{
    /**
     * Handle the ReservationItem "created" event.
     */
    public function created(ReservationItem $reservationItem): void
    {
        // Update the reservation's total price when a new item is added
        if ($reservationItem->reservation) {
            $reservationItem->reservation->updateTotalPrice();
        }
    }

    /**
     * Handle the ReservationItem "updated" event.
     */
    public function updated(ReservationItem $reservationItem): void
    {
        // Update the reservation's total price when an item is updated
        if ($reservationItem->reservation && $reservationItem->isDirty('price')) {
            $reservationItem->reservation->updateTotalPrice();
        }
    }

    /**
     * Handle the ReservationItem "deleted" event.
     */
    public function deleted(ReservationItem $reservationItem): void
    {
        // Update the reservation's total price when an item is removed
        if ($reservationItem->reservation) {
            $reservationItem->reservation->updateTotalPrice();
        }
    }

    /**
     * Handle the ReservationItem "restored" event.
     */
    public function restored(ReservationItem $reservationItem): void
    {
        //
    }

    /**
     * Handle the ReservationItem "force deleted" event.
     */
    public function forceDeleted(ReservationItem $reservationItem): void
    {
        //
    }

    public function saved(ReservationItem $reservationItem): void
    {
        if ($reservationItem->reservation) {
            $reservationItem->reservation->updateTotalPrice();
        }
    }
}
