<?php

namespace App\Services;

class HmacService
{
    public function sign(array $params, string $secret): string
    {
        ksort($params);
        $query = http_build_query($params);
        return hash_hmac('sha256', $query, $secret);
    }

    public function verify(array $params, string $secret, ?string $provided): bool
    {
        if (!$provided) {
            return false;
        }
        $copy = $params;
        unset($copy['sig']);
        $expected = $this->sign($copy, $secret);
        return hash_equals($expected, $provided);
    }
}

