<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'buyer_id',
        'invoice_number',
        'total_amount',
        'service_fee',
        'shipping_fee',
        'status',
        'payment_method',
        'delivery_address',
    ];

    protected $casts = [
        'total_amount'  => 'decimal:2',
        'service_fee'   => 'decimal:2',
        'shipping_fee'  => 'decimal:2',
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function review()
    {
        return $this->hasMany(Review::class, 'order_id');
    }

    // Scope helpers
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
