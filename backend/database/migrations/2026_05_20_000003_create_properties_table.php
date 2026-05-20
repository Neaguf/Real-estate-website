<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->foreignId('city_id')->constrained()->restrictOnDelete();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 12, 2);
            $table->string('currency', 3)->default('EUR');
            $table->string('address')->nullable();
            $table->unsignedTinyInteger('rooms')->nullable();
            $table->decimal('surface', 8, 2)->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->index(['status', 'city_id', 'category_id']);
            $table->index('price');
            $table->index('rooms');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
