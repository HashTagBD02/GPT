<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TrackingService;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function __construct(private TrackingService $trackingService) {}

    public function click(Request $request)
    {
        $result = $this->trackingService->handleClick($request->all(), $request);
        return $result; // Will be a RedirectResponse or JSON per service
    }
}

