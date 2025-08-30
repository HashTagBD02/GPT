<?php

it('serves pixel gif', function () {
    $resp = $this->get('/api/pixel.gif?txid=01HZPXTEST');
    $resp->assertOk();
    expect($resp->headers->get('Content-Type'))->toBe('image/gif');
});

