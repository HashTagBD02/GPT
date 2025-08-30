<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\S2SController;
use App\Http\Controllers\Api\PixelController;
use App\Http\Controllers\Api\ClicksController;
use App\Http\Controllers\Api\ConversionsController;
use App\Http\Controllers\Api\OffersController;
use App\Http\Controllers\Api\AffiliatesController;
use App\Http\Controllers\Api\StatsController;

// Public tracking endpoints
Route::middleware(['throttle:clicks'])->group(function () {
    Route::get('/click', [TrackingController::class, 'click']);
});

Route::middleware(['throttle:s2s'])->group(function () {
    Route::match(['GET','POST'], '/s2s', [S2SController::class, 'handle']);
});

Route::middleware(['throttle:pixel'])->group(function () {
    Route::get('/pixel.gif', [PixelController::class, 'pixel']);
});

// Authenticated API v1
Route::prefix('v1')->group(function () {
    Route::get('/docs', function () {
        return redirect('/api/documentation');
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/clicks', [ClicksController::class, 'index']);
        Route::get('/conversions', [ConversionsController::class, 'index']);
        Route::post('/conversions/approve', [ConversionsController::class, 'approveBulk']);
        Route::post('/conversions/reject', [ConversionsController::class, 'rejectBulk']);

        Route::apiResource('offers', OffersController::class);
        Route::apiResource('affiliates', AffiliatesController::class);

        Route::get('/stats/summary', [StatsController::class, 'summary']);
    });
});

