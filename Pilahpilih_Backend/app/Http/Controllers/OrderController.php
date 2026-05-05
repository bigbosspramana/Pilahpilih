<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\InteractionLog;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    // ─── BUYER: Buat pesanan dari keranjang ───────────────────
    public function store(Request $request)
    {
        $request->validate([
            'payment_method'   => 'required|in:qris,bank_transfer,cod',
            'delivery_address' => 'nullable|string',
        ]);

        $user = $request->user();

        $cartItems = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Keranjang kosong',
            ], 422);
        }

        // Hitung total
        $subtotal       = $cartItems->sum(fn($i) => $i->product->price_per_kg * $i->quantity);
        $serviceFee     = 2000;
        $shippingFee    = 0; // bisa dihitung berdasarkan jarak nanti
        $totalAmount    = $subtotal + $serviceFee + $shippingFee;

        // Buat order
        $order = Order::create([
            'id'               => 'ORD' . strtoupper(Str::random(7)),
            'buyer_id'         => $user->id,
            'invoice_number'   => 'INV-' . now()->format('Ymd') . '-' . strtoupper(Str::random(4)),
            'total_amount'     => $totalAmount,
            'service_fee'      => $serviceFee,
            'shipping_fee'     => $shippingFee,
            'status'           => 'pending',
            'payment_method'   => $request->payment_method,
            'delivery_address' => $request->delivery_address,
        ]);

        // Buat order items + catat interaksi purchase
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id'          => $order->id,
                'product_id'        => $item->product_id,
                'quantity'          => $item->quantity,
                'price_at_purchase' => $item->product->price_per_kg,
                'subtotal'          => $item->product->price_per_kg * $item->quantity,
            ]);

            // Kurangi stok
            $item->product->decrement('stock', $item->quantity);

            // Catat interaksi purchase
            InteractionLog::create([
                'user_id'    => $user->id,
                'product_id' => $item->product_id,
                'type'       => 'purchase',
            ]);

            // Notifikasi ke seller
            $seller = $item->product->seller;
            NotificationService::send(
                $seller,
                'Pesanan Baru Masuk!',
                "Ada pesanan baru untuk produk {$item->product->name}.",
                'order'
            );
        }

        // Kosongkan keranjang
        Cart::where('user_id', $user->id)->delete();

        // Notifikasi ke buyer
        NotificationService::send(
            $user,
            'Pesanan Berhasil Dibuat',
            "Pesanan #{$order->invoice_number} sedang diproses.",
            'order'
        );

        return response()->json([
            'message' => 'Pesanan berhasil dibuat',
            'order'   => $order->load('items.product'),
        ], 201);
    }

    // ─── BUYER: Riwayat pesanan ───────────────────────────────
    public function buyerOrders(Request $request)
    {
        $orders = Order::with('items.product')
            ->where('buyer_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    // ─── BUYER: Detail pesanan ────────────────────────────────
    public function show(Request $request, string $id)
    {
        $order = Order::with('items.product.seller')
            ->where('id', $id)
            ->where('buyer_id', $request->user()->id)
            ->firstOrFail();

        return response()->json(['order' => $order]);
    }

    // ─── SELLER: Pesanan masuk ────────────────────────────────
    public function sellerOrders(Request $request)
    {
        $sellerId = $request->user()->id;

        $orders = Order::with('items.product', 'buyer')
            ->whereHas('items.product', function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId);
            })
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    // ─── SELLER: Update status pesanan ───────────────────────
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:processing,shipped,completed,cancelled',
        ]);

        $sellerId = $request->user()->id;

        $order = Order::whereHas('items.product', function ($q) use ($sellerId) {
                $q->where('seller_id', $sellerId);
            })
            ->findOrFail($id);

        $order->update(['status' => $request->status]);

        // Notifikasi ke buyer
        $statusLabel = [
            'processing' => 'sedang diproses',
            'shipped'    => 'sedang dikirim',
            'completed'  => 'telah selesai',
            'cancelled'  => 'dibatalkan',
        ];

        NotificationService::send(
            $order->buyer,
            'Status Pesanan Diperbarui',
            "Pesanan #{$order->invoice_number} {$statusLabel[$request->status]}.",
            'order'
        );

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui',
            'order'   => $order->fresh(),
        ]);
    }
}
