<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // ─── Lihat keranjang ──────────────────────────────────────
    public function index(Request $request)
    {
        $cart = Cart::with('product.tags', 'product.seller')
            ->where('user_id', $request->user()->id)
            ->get();

        $total = $cart->sum(fn($item) => $item->product->price_per_kg * $item->quantity);

        return response()->json([
            'cart'  => $cart,
            'total' => $total,
        ]);
    }

    // ─── Tambah ke keranjang ──────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|string|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Cek stok
        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Stok tidak mencukupi',
            ], 422);
        }

        // Jika produk sudah ada di keranjang, update quantity
        $cart = Cart::where('user_id', $request->user()->id)
                    ->where('product_id', $request->product_id)
                    ->first();

        if ($cart) {
            $cart->update([
                'quantity' => $cart->quantity + $request->quantity,
            ]);
            $message = 'Quantity keranjang diperbarui';
        } else {
            $cart = Cart::create([
                'user_id'    => $request->user()->id,
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
            ]);
            $message = 'Produk berhasil ditambahkan ke keranjang';
        }

        // Catat interaksi save
        \App\Models\InteractionLog::create([
            'user_id'    => $request->user()->id,
            'product_id' => $request->product_id,
            'type'       => 'save',
        ]);

        return response()->json([
            'message' => $message,
            'cart'    => $cart->load('product'),
        ], 201);
    }

    // ─── Update quantity ──────────────────────────────────────
    public function update(Request $request, int $id)
    {
        $cart = Cart::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Cek stok
        if ($cart->product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Stok tidak mencukupi',
            ], 422);
        }

        $cart->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Quantity berhasil diperbarui',
            'cart'    => $cart->load('product'),
        ]);
    }

    // ─── Hapus dari keranjang ─────────────────────────────────
    public function destroy(Request $request, int $id)
    {
        $cart = Cart::where('id', $id)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $cart->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus dari keranjang',
        ]);
    }
}
