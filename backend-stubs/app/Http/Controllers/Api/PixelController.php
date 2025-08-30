<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ConversionService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PixelController extends Controller
{
    public function __construct(private ConversionService $conversionService) {}

    public function pixel(Request $request)
    {
        $this->conversionService->approveViaPixel($request->get('txid'));
        $gif = base64_decode('R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==');
        return new StreamedResponse(function () use ($gif) {
            echo $gif;
        }, 200, [
            'Content-Type' => 'image/gif',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
        ]);
    }
}

