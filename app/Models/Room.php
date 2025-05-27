<?php

namespace App\Models;

use App\HasAttachments;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Mail\Attachable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory, HasAttachments;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'capacity',
        'location',
        'price',
        'featured_image',
    ];
    protected $keyType = 'string';
    public $incrementing = false;

    #[Scope]
    protected function available(Builder $query): void
    {
        $query->whereDoesntHave('reservations', function ($q) {
            $q->whereHas('reservation', function ($q) {
                $q->where('status', 'confirmed');
            });
        });
    }

    public function facilities()
    {
        return $this->belongsToMany(Facility::class)->withPivot('custom_image_id')->withTimestamps();
    }

    public function reservations()
    {
        return $this->morphMany(ReservationItem::class, 'reservable');
    }

    public function reviews()
    {
        return $this->hasManyThrough(Review::class, ReservationItem::class, 'reservable_id')
            ->where('reservation_items.reservable_type', self::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getAverageRating()
    {
        $average = $this->reviews()->avg('rating');
        return $average === null ? 0.0 : (float)$average;
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();

            if ($model->slug === null) {
                $slug = Str::slug($model->name) . '-' . $model->location;

                $model->slug = $slug;
            }
        });
    }
}
