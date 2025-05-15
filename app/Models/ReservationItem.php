<?php

namespace App\Models;

use App\Observers\ReservationItemObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([ReservationItemObserver::class])]
class ReservationItem extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function reservable()
    {
        return $this->morphTo();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();

            // Load the reservable relation if not already loaded
            if (!$model->relationLoaded('reservable')) {
                $model->load('reservable');
            }

            // Set the price from reservable
            if ($model->reservable) {
                $model->price = $model->reservable->price;
            }
        });
    }
}
