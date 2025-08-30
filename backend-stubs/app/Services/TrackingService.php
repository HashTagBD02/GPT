<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TrackingService
{
    public function handleClick(array $params, Request $request)
    {
        // TODO: validate offer/affiliate, caps, targeting, device/geo detection
        $txid = (string) Str::ulid();

        // TODO: persist click record
        Log::info('click', [
            'offer_id' => $params['offer_id'] ?? null,
            'affiliate_id' => $params['aff_id'] ?? null,
            'txid' => $txid,
            'ip' => $request->ip(),
            'ua' => $request->userAgent(),
        ]);

        // TODO: build redirect URL with macros
        $redirectUrl = $params['preview'] ?? 'https://example.com?txid=' . urlencode($txid);

        return new RedirectResponse($redirectUrl, 302);
    }
}

