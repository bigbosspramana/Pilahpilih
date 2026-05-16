<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->string('invoice_number', 50)->unique();
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->decimal('service_fee', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->enum('status', [
                'pending', 'processing', 'shipped', 'completed', 'cancelled'
            ])->default('pending');
            $table->enum('payment_method', ['qris', 'bank_transfer', 'cod']);
            $table->text('delivery_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
