<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('full_name', 50);
            $table->string('email', 50)->unique();
            $table->string('password', 255);
            $table->string('phone', 15);
            $table->text('address');
            $table->text('address_detail')->nullable();
            $table->enum('role', ['buyer', 'seller']);
            $table->enum('account_type', ['personal', 'business']);
            $table->string('profile_photo')->nullable();  // path/url ke storage
            // Business profile — nullable untuk personal
            $table->string('store_name', 100)->nullable();
            $table->enum('business_type', [
                'catering', 'restaurant', 'bakery', 'food_stall', 'other'
            ])->nullable();
            $table->text('business_description')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
