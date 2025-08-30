<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendAffiliatePostbackJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 5;
    public int $backoff = 10;

    public function __construct(public string $url, public array $payload = []) {}

    public function handle(): void
    {
        $response = Http::timeout(10)->get($this->url, $this->payload);
        Log::info('postback_outbound', [
            'url' => $this->url,
            'payload' => $this->payload,
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
    }
}

