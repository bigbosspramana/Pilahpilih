<?php

namespace App\Http\Controllers;

use App\Models\BuyerPreference;
use App\Services\CacheService;
use Illuminate\Http\Request;

class BuyerPreferenceController extends Controller
{
    // ─── Lihat preferensi ─────────────────────────────────────
    public function index(Request $request)
    {
        $preferences = BuyerPreference::where('user_id', $request->user()->id)->get();

        return response()->json(['preferences' => $preferences]);
    }

    // ─── Tambah preferensi ────────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'type'  => 'required|in:category,ingredient,tag',
            'value' => 'required|string|max:50',
        ]);

        // Cegah duplikat
        $existing = BuyerPreference::where('user_id', $request->user()->id)
            ->where('type', $request->type)
            ->where('value', $request->value)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Preferensi sudah ada',
            ], 422);
        }

        $preference = BuyerPreference::create([
            'user_id' => $request->user()->id,
            'type'    => $request->type,
            'value'   => $request->value,
        ]);

        // Clear cache rekomendasi
        CacheService::clearRecommendations($request->user()->id);

        return response()->json([
            'message'    => 'Preferensi berhasil ditambahkan',
            'preference' => $preference,
        ], 201);
    }

    // ─── Hapus preferensi ─────────────────────────────────────
    public function destroy(Request $request, int $id)
    {
        $preference = BuyerPreference::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $preference->delete();
        CacheService::clearRecommendations($request->user()->id);

        return response()->json([
            'message' => 'Preferensi berhasil dihapus',
        ]);
    }
}
