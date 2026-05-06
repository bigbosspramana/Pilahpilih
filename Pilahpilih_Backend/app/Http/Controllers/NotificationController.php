<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // ─── Lihat semua notifikasi ───────────────────────────────
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        $unreadCount = $notifications->where('is_read', false)->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count'  => $unreadCount,
        ]);
    }

    // ─── Tandai satu notifikasi sudah dibaca ──────────────────
    public function markAsRead(Request $request, int $id)
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->update(['is_read' => true]);

        return response()->json([
            'message' => 'Notifikasi berhasil ditandai sudah dibaca',
        ]);
    }

    // ─── Tandai semua notifikasi sudah dibaca ─────────────────
    public function markAllAsRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)
                    ->where('is_read', false)
                    ->update(['is_read' => true]);

        return response()->json([
            'message' => 'Semua notifikasi berhasil ditandai sudah dibaca',
        ]);
    }
}
