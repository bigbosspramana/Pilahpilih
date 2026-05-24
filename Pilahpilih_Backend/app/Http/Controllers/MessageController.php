<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Services\MediaService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // ─── Lihat semua chat ─────────────────────────────────────
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Ambil semua user yang pernah chat dengan user ini
        $conversations = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with('sender:id,full_name,profile_photo', 'receiver:id,full_name,profile_photo')
            ->latest()
            ->get()
            ->groupBy(function ($msg) use ($userId) {
                return $msg->sender_id === $userId
                    ? $msg->receiver_id
                    : $msg->sender_id;
            })
            ->map(fn($messages) => $messages->first()); // ambil pesan terakhir per conversation

        return response()->json(['conversations' => $conversations->values()]);
    }

    // ─── Lihat conversation dengan user tertentu ──────────────
    public function conversation(Request $request, string $otherUserId)
    {
        $userId = $request->user()->id;

        $messages = Message::conversation($userId, $otherUserId)
            ->with('sender:id,full_name,profile_photo')
            ->get();

        // Tandai pesan masuk sebagai sudah dibaca
        Message::where('sender_id', $otherUserId)
               ->where('receiver_id', $userId)
               ->where('is_read', false)
               ->update(['is_read' => true]);

        $otherUser = User::select('id', 'full_name', 'profile_photo', 'store_name')
                         ->findOrFail($otherUserId);

        return response()->json([
            'messages'   => $messages,
            'other_user' => $otherUser,
        ]);
    }

    // ─── Kirim pesan teks ─────────────────────────────────────
    public function send(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer|exists:users,id',
            'body'        => 'required_without:media|nullable|string',
            'media'       => 'required_without:body|nullable|file|mimes:jpg,jpeg,png,gif,mp4,mov|max:51200',
        ]);

        $data = [
            'sender_id'    => $request->user()->id,
            'receiver_id'  => $request->receiver_id,
            'body'         => $request->body,
            'message_type' => 'text',
        ];

        // Upload media jika ada
        if ($request->hasFile('media')) {
            $uploaded = MediaService::uploadMessageMedia(
                $request->file('media'),
                $request->user()->id
            );
            $data['media_url']    = $uploaded['media_url'];
            $data['media_type']   = $uploaded['media_type'];
            $data['message_type'] = $uploaded['media_type']; // 'image' atau 'video'
        }

        $message = Message::create($data);

        return response()->json([
            'message' => 'Pesan berhasil dikirim',
            'data'    => $message->load('sender:id,full_name,profile_photo'),
        ], 201);
    }

    // ─── Tandai pesan sudah dibaca ────────────────────────────
    public function markAsRead(Request $request, string $otherUserId)
    {
        Message::where('sender_id', $otherUserId)
               ->where('receiver_id', $request->user()->id)
               ->where('is_read', false)
               ->update(['is_read' => true]);

        return response()->json([
            'message' => 'Pesan berhasil ditandai sudah dibaca',
        ]);
    }
}
