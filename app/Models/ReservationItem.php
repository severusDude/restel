<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

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
        });
    }
}
