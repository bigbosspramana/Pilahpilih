<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\BuyerPreferenceController;

// ─── Public Routes (tidak perlu login) ───────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Lihat produk & review — bisa diakses tanpa login
Route::get('/products',                    [ProductController::class, 'index']);
Route::get('/products/{id}',               [ProductController::class, 'show']);
Route::get('/products/{id}/reviews',       [ReviewController::class, 'productReviews']);

// ─── Protected Routes (wajib login) ──────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout',              [AuthController::class, 'logout']);
    Route::get('/profile',              [AuthController::class, 'profile']);
    Route::post('/profile',             [AuthController::class, 'updateProfile']);
    Route::post('/fcm-token',           [AuthController::class, 'updateFcmToken']);

    // Products
    Route::get('/products/recommendations', [ProductController::class, 'recommendations']);

    // Seller only
    Route::middleware('role:seller')->group(function () {
        Route::post('/products',                              [ProductController::class, 'store']);
        Route::put('/products/{id}',                         [ProductController::class, 'update']);
        Route::delete('/products/{id}',                      [ProductController::class, 'destroy']);
        Route::get('/my-products',                           [ProductController::class, 'myProducts']);
        Route::post('/products/{id}/tags',                   [ProductController::class, 'addTag']);
        Route::delete('/products/{productId}/tags/{tagId}',  [ProductController::class, 'deleteTag']);
        Route::get('/seller/orders',                         [OrderController::class, 'sellerOrders']);
        Route::put('/orders/{id}/status',                    [OrderController::class, 'updateStatus']);
    });

    // Buyer only
    Route::middleware('role:buyer')->group(function () {
        Route::get('/cart',           [CartController::class, 'index']);
        Route::post('/cart',          [CartController::class, 'store']);
        Route::put('/cart/{id}',      [CartController::class, 'update']);
        Route::delete('/cart/{id}',   [CartController::class, 'destroy']);
        Route::post('/orders',        [OrderController::class, 'store']);
        Route::get('/orders',         [OrderController::class, 'buyerOrders']);
        Route::get('/orders/{id}',    [OrderController::class, 'show']);
        Route::post('/reviews',       [ReviewController::class, 'store']);
    });

    // Messages — buyer & seller bisa
    Route::get('/messages',                      [MessageController::class, 'index']);
    Route::get('/messages/{userId}',             [MessageController::class, 'conversation']);
    Route::post('/messages',                     [MessageController::class, 'send']);
    Route::put('/messages/{userId}/read',        [MessageController::class, 'markAsRead']);

    // Notifications
    Route::get('/notifications',             [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read',   [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all',    [NotificationController::class, 'markAllAsRead']);

    // Preferences
    Route::get('/preferences',          [BuyerPreferenceController::class, 'index']);
    Route::post('/preferences',         [BuyerPreferenceController::class, 'store']);
    Route::delete('/preferences/{id}',  [BuyerPreferenceController::class, 'destroy']);
});
