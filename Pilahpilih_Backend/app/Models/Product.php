<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
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

    // Format ID untuk tampilan
    public function getFormattedIdAttribute(): string
    {
        return 'PRD' . str_pad($this->id, 3, '0', STR_PAD_LEFT);
    }

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
