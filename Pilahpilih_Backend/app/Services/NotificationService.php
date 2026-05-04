<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    // Kirim in-app notification + push notification sekaligus
    public static function send(User $user, string $title, string $body, string $type = 'system'): void
    {
        // 1. Simpan ke database (in-app)
        Notification::create([
            'user_id' => $user->id,
            'title'   => $title,
            'body'    => $body,
            'type'    => $type,
            'is_read' => false,
        ]);

        // 2. Kirim push notification jika user punya FCM token
        if ($user->fcm_token) {
            self::sendPushNotification($user->fcm_token, $title, $body);
        }
    }

    private static function sendPushNotification(string $token, string $title, string $body): void
    {
        // Akan diisi setelah setup Firebase
        // Untuk sekarang in-app notification dulu
    }
}
