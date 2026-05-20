<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\PropertyController;
use App\Models\Category;
use App\Models\City;
use Illuminate\Support\Facades\Route;

Route::get('/categories', fn () => Category::orderBy('name')->get());
Route::get('/cities', fn () => City::orderBy('name')->get());
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{property}', [PropertyController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/properties', [PropertyController::class, 'store']);
    Route::put('/properties/{property}', [PropertyController::class, 'update']);
    Route::delete('/properties/{property}', [PropertyController::class, 'destroy']);
    Route::post('/properties/{property}/images', [PropertyController::class, 'uploadImages']);

    Route::post('/properties/{property}/favorite', [FavoriteController::class, 'store']);
    Route::delete('/properties/{property}/favorite', [FavoriteController::class, 'destroy']);
});
