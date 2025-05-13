<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function attachable()
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
