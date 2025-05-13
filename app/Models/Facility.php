<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function rooms()
    {
        return $this->belongsToMany(Room::class)->withPivot('custom_image_id')->withTimestamps();
    }

    public function defaultImage()
    {
        return $this->belongsTo(Attachment::class, 'default_image_id');
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}
