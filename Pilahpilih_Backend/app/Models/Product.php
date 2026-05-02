<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'seller_id',
        'name',
        'description',
        'price_per_kg',
        'stock',
        'photo',
        'category',
        'status',
        'imperfect_label',
        'imperfect_description',
        'harvest_date',
        'fresh_until',
        'is_realtime_photo',
    ];

    protected $casts = [
        'price_per_kg'      => 'decimal:2',
        'harvest_date'      => 'date',
        'fresh_until'       => 'datetime',
        'is_realtime_photo' => 'boolean',
    ];

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function tags()
    {
        return $this->hasMany(ProductTag::class, 'product_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }

    public function cartItems()
    {
        return $this->hasMany(Cart::class, 'product_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id');
    }

    public function interactionLogs()
    {
        return $this->hasMany(InteractionLog::class, 'product_id');
    }

    // Scope helpers
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeFresh($query)
    {
        return $query->where('fresh_until', '>', now());
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
