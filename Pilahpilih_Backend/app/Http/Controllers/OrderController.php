<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Services\CheckoutService;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // ─── BUYER: Checkout dari Cart ────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'cart_ids'         => 'required|array|min:1',
            'cart_ids.*'       => 'integer|exists:carts,id',
            'payment_method'   => 'required|in:qris,bank_transfer,cod',
            'delivery_address' => 'nullable|string',
        ]);

        $user = $request->user();

        // Ambil hanya cart item yang dipilih buyer
        $cartItems = Cart::with('product.seller')
            ->where('user_id', $user->id)
            ->whereIn('id', $request->cart_ids)  // ← filter berdasarkan pilihan
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada item yang dipilih',
            ], 422);
        }

        // Cek stok semua item yang dipilih
        foreach ($cartItems as $item) {
            if ($item->product->stock < $item->quantity) {
                return response()->json([
                    'message' => "Stok {$item->product->name} tidak mencukupi",
                ], 422);
            }
        }

        // Format items untuk CheckoutService
        $items = $cartItems->map(fn($item) => [
            'product'  => $item->product,
            'quantity' => $item->quantity,
        ])->toArray();

        $order = CheckoutService::createOrder(
            $user,
            $items,
            $request->payment_method,
            $request->delivery_address
        );

        // Hapus HANYA item yang di-checkout, bukan semua cart
        Cart::where('user_id', $user->id)
            ->whereIn('id', $request->cart_ids)
            ->delete();

        return response()->json([
            'message' => 'Pesanan berhasil dibuat',
            'order'   => $order->load('items.product'),
        ], 201);
    }

    // ─── BUYER: Beli Langsung (Buy Now) ──────────────────────
    public function buyNow(Request $request)
    {
        $request->validate([
            'product_id'       => 'required|integer|exists:products,id',
            'quantity'         => 'required|integer|min:1',
            'payment_method'   => 'required|in:qris,bank_transfer,cod',
            'delivery_address' => 'nullable|string',
        ]);

        $product = Product::with('seller')->findOrFail($request->product_id);

        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Stok tidak mencukupi',
            ], 422);
        }

        $order = CheckoutService::createOrder(
            $request->user(),
            [['product' => $product, 'quantity' => $request->quantity]],
            $request->payment_method,
            $request->delivery_address
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
