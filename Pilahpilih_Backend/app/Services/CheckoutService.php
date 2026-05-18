<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\InteractionLog;
use App\Models\User;
use Illuminate\Support\Str;

class CheckoutService
{
    /**
     * Core checkout logic — dipakai oleh buy now & cart checkout
     */
    public static function createOrder(
        User $buyer,
        array $items, // [['product' => Product, 'quantity' => int]]
        string $paymentMethod,
        ?string $deliveryAddress = null
    ): Order {
        // Hitung total
        $subtotal    = collect($items)->sum(fn($i) => $i['product']->price_per_kg * $i['quantity']);
        $serviceFee  = 2000;
        $shippingFee = 0;
        $totalAmount = $subtotal + $serviceFee + $shippingFee;

        // Buat order
        $order = Order::create([
            'buyer_id'         => $buyer->id,
            'invoice_number'   => 'INV-' . now()->format('Ymd') . '-' . strtoupper(Str::random(4)),
            'total_amount'     => $totalAmount,
            'service_fee'      => $serviceFee,
            'shipping_fee'     => $shippingFee,
            'status'           => 'pending',
            'payment_method'   => $paymentMethod,
            'delivery_address' => $deliveryAddress,
        ]);

        // Buat order items
        foreach ($items as $item) {
            OrderItem::create([
                'order_id'          => $order->id,
                'product_id'        => $item['product']->id,
                'quantity'          => $item['quantity'],
                'price_at_purchase' => $item['product']->price_per_kg,
                'subtotal'          => $item['product']->price_per_kg * $item['quantity'],
            ]);

            // Kurangi stok
            $item['product']->decrement('stock', $item['quantity']);

            // Catat interaksi purchase
            InteractionLog::create([
                'user_id'    => $buyer->id,
                'product_id' => $item['product']->id,
                'type'       => 'purchase',
            ]);

            // Notifikasi ke seller
            NotificationService::send(
                $item['product']->seller,
                'Pesanan Baru Masuk!',
                "Ada pesanan baru untuk produk {$item['product']->name}.",
                'order'
            );
        }

        // Notifikasi ke buyer
        NotificationService::send(
            $buyer,
            'Pesanan Berhasil Dibuat',
            "Pesanan #{$order->invoice_number} sedang diproses.",
            'order'
        );

        return $order;
    }
}
