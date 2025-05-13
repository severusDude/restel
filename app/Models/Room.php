<?php

namespace App\Models;

use Illuminate\Contracts\Mail\Attachable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'capacity',
        'location',
        'price',
    ];
    protected $keyType = 'string';
    public $incrementing = false;

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function facilities()
    {
        return $this->belongsToMany(Facility::class)->withPivot('custom_image_id')->withTimestamps();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
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
