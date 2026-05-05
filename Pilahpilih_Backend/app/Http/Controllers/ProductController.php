<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTag;
use App\Models\InteractionLog;
use App\Services\MediaService;
use App\Services\CacheService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // ─── BUYER: Lihat semua produk (dengan cache) ─────────────
    public function index(Request $request)
    {
        $category = $request->query('category');
        $cacheKey = $category ?? 'all';

        $products = CacheService::getProducts($cacheKey, function () use ($category) {
            $query = Product::with('tags', 'seller')
                            ->available()
                            ->fresh();

            if ($category) {
                $query->byCategory($category);
            }

            return $query->latest()->get();
        });

        return response()->json(['products' => $products]);
    }

    // ─── BUYER: Lihat detail produk ───────────────────────────
    public function show(Request $request, string $id)
    {
        $product = Product::with('tags', 'seller', 'reviews')->findOrFail($id);

        // Catat interaksi view otomatis
        if ($request->user()) {
            InteractionLog::create([
                'user_id'              => $request->user()->id,
                'product_id'           => $id,
                'type'                 => 'view',
                'view_duration_seconds'=> $request->input('duration', null),
            ]);

            // Clear cache rekomendasi user ini
            CacheService::clearRecommendations($request->user()->id);
        }

        return response()->json(['product' => $product]);
    }

    // ─── BUYER: Rekomendasi AI ────────────────────────────────
    public function recommendations(Request $request)
    {
        $user = $request->user();

        $recommendations = CacheService::getRecommendations($user->id, function () use ($user) {
            // Ambil preferensi buyer
            $preferences = $user->preferences->pluck('value')->toArray();

            // Ambil tag dari produk yang sering dilihat
            $viewedProductIds = $user->interactionLogs()
                ->where('type', 'view')
                ->latest()
                ->take(20)
                ->pluck('product_id');

            $viewedTags = \App\Models\ProductTag::whereIn('product_id', $viewedProductIds)
                ->pluck('tag')
                ->toArray();

            // Gabungkan preferensi + tag yang dilihat
            $allTags = array_unique(array_merge($preferences, $viewedTags));

            // Cari produk yang cocok
            return Product::with('tags', 'seller')
                ->available()
                ->fresh()
                ->whereHas('tags', function ($q) use ($allTags) {
                    $q->whereIn('tag', $allTags);
                })
                ->take(10)
                ->get();
        });

        return response()->json(['recommendations' => $recommendations]);
    }

    // ─── SELLER: Tambah produk ────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:50',
            'description'           => 'nullable|string',
            'price_per_kg'          => 'required|numeric|min:0',
            'stock'                 => 'required|integer|min:0',
            'photo'                 => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'category'              => 'required|in:vegetable,fruit,fish,meat,tuber,spice',
            'imperfect_label'       => 'required|in:slightly_imperfect,moderately_imperfect',
            'imperfect_description' => 'nullable|string',
            'harvest_date'          => 'nullable|date',
            'fresh_until'           => 'nullable|date',
            'is_realtime_photo'     => 'boolean',
            'tags'                  => 'nullable|array',
            'tags.*'                => 'string|max:30',
        ]);

        $productId = 'PRD' . strtoupper(Str::random(7));

        $data = $request->only([
            'name', 'description', 'price_per_kg', 'stock',
            'category', 'imperfect_label', 'imperfect_description',
            'harvest_date', 'fresh_until', 'is_realtime_photo',
        ]);

        $data['id']        = $productId;
        $data['seller_id'] = $request->user()->id;

        // Upload foto produk
        if ($request->hasFile('photo')) {
            $data['photo'] = MediaService::uploadProductPhoto(
                $request->file('photo'),
                $productId
            );
        }

        $product = Product::create($data);

        // Simpan tags jika ada
        if ($request->has('tags')) {
            foreach ($request->tags as $tag) {
                ProductTag::create([
                    'product_id' => $product->id,
                    'tag'        => $tag,
                ]);
            }
        }

        // Clear cache produk
        CacheService::clearProducts();

        return response()->json([
            'message' => 'Produk berhasil ditambahkan',
            'product' => $product->load('tags'),
        ], 201);
    }

    // ─── SELLER: Edit produk ──────────────────────────────────
    public function update(Request $request, string $id)
    {
        $product = Product::where('id', $id)
                          ->where('seller_id', $request->user()->id)
                          ->firstOrFail();

        $request->validate([
            'name'                  => 'sometimes|string|max:50',
            'description'           => 'nullable|string',
            'price_per_kg'          => 'sometimes|numeric|min:0',
            'stock'                 => 'sometimes|integer|min:0',
            'photo'                 => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'category'              => 'sometimes|in:vegetable,fruit,fish,meat,tuber,spice',
            'imperfect_label'       => 'sometimes|in:slightly_imperfect,moderately_imperfect',
            'imperfect_description' => 'nullable|string',
            'harvest_date'          => 'nullable|date',
            'fresh_until'           => 'nullable|date',
            'status'                => 'sometimes|in:available,out_of_stock',
        ]);

        $data = $request->only([
            'name', 'description', 'price_per_kg', 'stock',
            'category', 'imperfect_label', 'imperfect_description',
            'harvest_date', 'fresh_until', 'status',
        ]);

        // Upload foto baru jika ada
        if ($request->hasFile('photo')) {
            if ($product->photo) {
                MediaService::delete($product->photo);
            }
            $data['photo'] = MediaService::uploadProductPhoto(
                $request->file('photo'),
                $product->id
            );
        }

        $product->update($data);
        CacheService::clearProducts();

        return response()->json([
            'message' => 'Produk berhasil diperbarui',
            'product' => $product->fresh()->load('tags'),
        ]);
    }

    // ─── SELLER: Hapus produk ─────────────────────────────────
    public function destroy(Request $request, string $id)
    {
        $product = Product::where('id', $id)
                          ->where('seller_id', $request->user()->id)
                          ->firstOrFail();

        if ($product->photo) {
            MediaService::delete($product->photo);
        }

        $product->delete();
        CacheService::clearProducts();

        return response()->json([
            'message' => 'Produk berhasil dihapus',
        ]);
    }

    // ─── SELLER: My products ──────────────────────────────────
    public function myProducts(Request $request)
    {
        $products = Product::with('tags')
            ->where('seller_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json(['products' => $products]);
    }

    // ─── SELLER: Tambah tag produk ────────────────────────────
    public function addTag(Request $request, string $id)
    {
        $product = Product::where('id', $id)
                          ->where('seller_id', $request->user()->id)
                          ->firstOrFail();

        $request->validate([
            'tag' => 'required|string|max:30',
        ]);

        $tag = ProductTag::create([
            'product_id' => $product->id,
            'tag'        => $request->tag,
        ]);

        CacheService::clearProducts();

        return response()->json([
            'message' => 'Tag berhasil ditambahkan',
            'tag'     => $tag,
        ], 201);
    }

    // ─── SELLER: Hapus tag produk ─────────────────────────────
    public function deleteTag(Request $request, string $productId, int $tagId)
    {
        $product = Product::where('id', $productId)
                          ->where('seller_id', $request->user()->id)
                          ->firstOrFail();

        $tag = ProductTag::where('id', $tagId)
                         ->where('product_id', $product->id)
                         ->firstOrFail();

        $tag->delete();
        CacheService::clearProducts();

        return response()->json([
            'message' => 'Tag berhasil dihapus',
        ]);
    }
}
