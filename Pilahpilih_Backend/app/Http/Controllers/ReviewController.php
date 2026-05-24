<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // ─── Buat review ──────────────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'order_id'   => 'required|integer|exists:orders,id',
            'product_id' => 'required|integer|exists:products,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'nullable|string',
        ]);

        // Pastikan order milik buyer ini dan sudah completed
        $order = Order::where('id', $request->order_id)
                      ->where('buyer_id', $request->user()->id)
                      ->where('status', 'completed')
                      ->firstOrFail();

        // Cek sudah pernah review produk ini di order ini
        $existing = Review::where('order_id', $request->order_id)
                          ->where('product_id', $request->product_id)
                          ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Produk ini sudah pernah diulas',
            ], 422);
        }

        $review = Review::create([
            'order_id'   => $request->order_id,
            'product_id' => $request->product_id,
            'buyer_id'   => $request->user()->id,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
        ]);

        return response()->json([
            'message' => 'Review berhasil ditambahkan',
            'review'  => $review,
        ], 201);
    }

    // ─── Lihat review produk ──────────────────────────────────
    public function productReviews(string $productId)
    {
        $reviews = Review::with('buyer:id,full_name,profile_photo')
            ->where('product_id', $productId)
            ->latest()
            ->get();

        $averageRating = $reviews->avg('rating');

        return response()->json([
            'reviews'        => $reviews,
            'average_rating' => round($averageRating, 1),
            'total_reviews'  => $reviews->count(),
        ]);
    }
}
