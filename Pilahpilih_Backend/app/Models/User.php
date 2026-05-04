<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Attributes\Attribute;

class User extends Authenticatable
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'full_name',
        'email',
        'password',
        'phone',
        'address',
        'address_detail',
        'role',
        'account_type',
        'profile_photo',
        'store_name',
        'business_type',
        'business_description',
        'is_verified',
        'fcm_token',
    ];

    protected $hidden = [
        'password', // tidak muncul di response JSON
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'password'    => 'hashed', // auto bcrypt saat disimpan
    ];

    // ─── Relasi sebagai Seller ───────────────────────────────

    public function products()
    {
        return $this->hasMany(Product::class, 'seller_id');
    }

    // ─── Relasi sebagai Buyer ────────────────────────────────

    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'buyer_id');
    }

    public function preferences()
    {
        return $this->hasMany(BuyerPreference::class, 'user_id');
    }

    public function interactionLogs()
    {
        return $this->hasMany(InteractionLog::class, 'user_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    // ─── Relasi Message ──────────────────────────────────────

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    // ─── Scope Helpers ───────────────────────────────────────

    public function scopeSellers($query)
    {
        return $query->where('role', 'seller');
    }

    public function scopeBuyers($query)
    {
        return $query->where('role', 'buyer');
    }

    public function scopeBusiness($query)
    {
        return $query->where('account_type', 'business');
    }

    public function scopePersonal($query)
    {
        return $query->where('account_type', 'personal');
    }
}
