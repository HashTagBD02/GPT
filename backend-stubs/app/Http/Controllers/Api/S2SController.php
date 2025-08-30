<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ConversionService;
use Illuminate\Http\Request;

class S2SController extends Controller
{
    public function __construct(private ConversionService $conversionService) {}

    public function handle(Request $request)
    {
        $result = $this->conversionService->handleInbound($request->all(), $request);
        return response()->json($result);
    }
}

