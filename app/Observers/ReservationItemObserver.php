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
        //
    }

    /**
     * Handle the ReservationItem "updated" event.
     */
    public function updated(ReservationItem $reservationItem): void
    {
        //
    }

    /**
     * Handle the ReservationItem "deleted" event.
     */
    public function deleted(ReservationItem $reservationItem): void
    {
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
