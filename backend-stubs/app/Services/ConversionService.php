<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConversionService
{
    public function handleInbound(array $params, Request $request): array
    {
        // TODO: verify HMAC, find click by txid, idempotent upsert
        Log::info('s2s_inbound', [
            'query' => $params,
            'ip' => $request->ip(),
        ]);

        $status = $params['status'] ?? 'approved';
        // simulate processing
        return [
            'ok' => true,
            'status' => $status,
        ];
    }

    public function approveViaPixel(?string $txid): void
    {
        if (!$txid) {
            return;
        }
        // TODO: update pending conversion to approved if allowed
        Log::info('pixel_approve', ['txid' => $txid]);
    }
}

