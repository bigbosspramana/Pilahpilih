<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    // Cache rekomendasi AI per user — expire 10 menit
    public static function getRecommendations(string $userId, callable $callback)
    {
        return Cache::remember("recommendations_{$userId}", 600, $callback);
    }

    // Cache list produk — expire 5 menit
    public static function getProducts(string $key, callable $callback)
    {
        return Cache::remember("products_{$key}", 300, $callback);
    }

    // Hapus cache produk saat ada update
    public static function clearProducts(): void
    {
        Cache::forget('products_all');
        Cache::forget('products_vegetable');
        Cache::forget('products_fruit');
        Cache::forget('products_fish');
        Cache::forget('products_meat');
        Cache::forget('products_tuber');
        Cache::forget('products_spice');
    }

    // Hapus cache rekomendasi user tertentu
    public static function clearRecommendations(string $userId): void
    {
        Cache::forget("recommendations_{$userId}");
    }
}
