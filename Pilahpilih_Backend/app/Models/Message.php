<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'body',
        'media_url',
        'media_type',
        'message_type', 
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    // Scope helper
    public function scopeConversation($query, $userId, $otherUserId)
    {
        return $query->where(function ($q) use ($userId, $otherUserId) {
            $q->where('sender_id', $userId)
              ->where('receiver_id', $otherUserId);
        })->orWhere(function ($q) use ($userId, $otherUserId) {
            $q->where('sender_id', $otherUserId)
              ->where('receiver_id', $userId);
        })->orderBy('created_at', 'asc');
    }
}
