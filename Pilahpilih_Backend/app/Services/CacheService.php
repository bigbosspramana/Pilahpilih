<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    public static function getRecommendations(int $userId, callable $callback)
    {
        return Cache::remember("recommendations_{$userId}", 600, function () use ($callback) {
            return $callback()->toArray(); // ← convert ke array
        });
    }

    public static function getProducts(string $key, callable $callback)
    {
        return Cache::remember("products_{$key}", 300, function () use ($callback) {
            return $callback()->toArray(); // ← convert ke array
        });
    }

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

    public static function clearRecommendations(int $userId): void
    {
        Cache::forget("recommendations_{$userId}");
    }
}
