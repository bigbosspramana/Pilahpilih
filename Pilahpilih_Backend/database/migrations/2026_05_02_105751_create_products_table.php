<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('name', 50);
            $table->text('description')->nullable();
            $table->decimal('price_per_kg', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('photo')->nullable();
            $table->enum('category', [
                'vegetable', 'fruit', 'fish', 'meat', 'tuber', 'spice'
            ]);
            $table->enum('status', ['available', 'out_of_stock'])->default('available');
            $table->enum('imperfect_label', [
                'slightly_imperfect', 'moderately_imperfect'
            ]);
            $table->text('imperfect_description')->nullable();
            $table->date('harvest_date')->nullable();
            $table->timestamp('fresh_until')->nullable();
            $table->boolean('is_realtime_photo')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
