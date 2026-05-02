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
        Schema::create('buyer_preferences', function (Blueprint $table) {
            $table->id();
            $table->string('user_id', 20);
            $table->enum('type', ['category', 'ingredient', 'tag']);
            $table->string('value', 50);
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buyer_preferences');
    }
};
