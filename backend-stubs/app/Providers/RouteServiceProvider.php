<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('clicks', function (Request $request) {
            return Limit::perMinute(120)->by($request->ip());
        });
        RateLimiter::for('s2s', function (Request $request) {
            return Limit::perMinute(600)->by($request->ip());
        });
        RateLimiter::for('pixel', function (Request $request) {
            return Limit::perMinute(600)->by($request->ip());
        });
    }
}

