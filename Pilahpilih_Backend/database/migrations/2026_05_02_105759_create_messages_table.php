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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('sender_id', 20);
            $table->string('receiver_id', 20);
            $table->text('body')->nullable(); // nullable karena bisa kirim foto/video tanpa teks
            $table->string('media_url')->nullable();
            $table->enum('media_type', ['image', 'video'])->nullable();
            $table->enum('message_type', ['text', 'image', 'video'])->default('text');
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            $table->foreign('sender_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('receiver_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
