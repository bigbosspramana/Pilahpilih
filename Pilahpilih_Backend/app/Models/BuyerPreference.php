<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuyerPreference extends Model
{
    protected $fillable = ['user_id', 'type', 'value'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
