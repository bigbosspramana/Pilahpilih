<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InteractionLog extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'type',
        'view_duration_seconds',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
