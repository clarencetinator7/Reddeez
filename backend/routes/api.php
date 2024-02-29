<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
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
Route::post('/logout', AuthController::class . '@logout')->middleware('auth:sanctum');

Route::group(['prefix' => 'user', 'middleware' => 'auth:sanctum'], function () {
    // Route::post('/{username}', UserController::class . '@getUserProfile');
    Route::post('/{id}', UserController::class . '@getUserWithId')->where('id', '[0-9]+');
    // User Profiles
    Route::post('/updateDisplayName', UserController::class . '@updateDisplayName');
    Route::post('/updateAvatar', UserController::class . '@updateAvatar');
});

Route::group(['prefix' => 'community'], function () {
    Route::post('/all', CommunityController::class . '@getAllCommunities');
    Route::post('/top', CommunityController::class . '@getTopCommunities');
    Route::post('/{id}', CommunityController::class . '@getCommunity')->where('id', '[0-9]+');
    // TODO: rename to `joinedCommunities`
    Route::post('/search', CommunityController::class . '@searchCommunity');
    Route::post('/myCommunities', CommunityController::class . '@getMyCommunities')->middleware('auth:sanctum');
    Route::post('/ownedCommunities', CommunityController::class . '@getOwnedCommunities')->middleware('auth:sanctum');
    Route::post('/create', CommunityController::class . '@createCommunity')->middleware('auth:sanctum');
    Route::post('/{id}/updateDescription', CommunityController::class . '@updateDescription')->where('id', '[0-9]+')->middleware('auth:sanctum');

    Route::post('/{id}/join', CommunityController::class . '@joinCommunity')->where('id', '[0-9]+')->middleware('auth:sanctum');
    Route::post('/{id}/leave', CommunityController::class . '@leaveCommunity')->where('id', '[0-9]+')->middleware('auth:sanctum');

    Route::post('/{id}/members', CommunityController::class . '@getCommunityMembers')->where('id', '[0-9]+');
    Route::post('/{id}/posts', CommunityController::class . '@getCommunityPosts')->where('id', '[0-9]+');
});


Route::group(['prefix' => 'post', 'middleware' => 'auth:sanctum'], function () {
    Route::post('/create', PostController::class . '@createPost');
    Route::post('/{id}/edit', PostController::class . '@editPost')->where('id', '[0-9]+');
    Route::post('/{id}/archive', PostController::class . '@archivePost')->where('id', '[0-9]+');
    Route::post('/{id}/writeComment', CommentController::class . '@commentOnPost')->where('id', '[0-9]+');
});
Route::group(['prefix' => 'post'], function () {
    Route::post('/{id}', PostController::class . '@getPost')->where('id', '[0-9]+');
});

Route::group(['prefix' => 'comment', 'middleware' => 'auth:sanctum'], function () {
    Route::post('/{id}/reply', CommentController::class . '@replyToComment')->where('id', '[0-9]+');
});

Route::group(['prefix' => 'vote', 'middleware' => 'auth:sanctum'], function () {
    Route::post('/{id}', VoteController::class . '@voteOnVoteable')->where('id', '[0-9]+');
});

// Route::post('/test', AuthController::class . '@test')->middleware('auth:sanctum');
