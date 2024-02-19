<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// AUTH ROUTES
Route::post('/register', AuthController::class . '@register');
Route::post('/login', AuthController::class . '@login');
Route::post('/logout', AuthController::class . '@logout');

Route::group(['prefix' => 'user', 'middleware' => 'auth:sanctum'], function () {
    // Route::post('/{username}', UserController::class . '@getUserProfile');
    Route::post('/{id}', UserController::class . '@getUserWithId')->where('id', '[0-9]+');
    Route::post('/{id}/communities', UserController::class . '@getUserCommunities')->where('id', '[0-9]+');

    // User Profiles
    Route::post('/updateDisplayName', UserController::class . '@changeDisplayName');
});

// Route::post('/test', AuthController::class . '@test')->middleware('auth:sanctum');
