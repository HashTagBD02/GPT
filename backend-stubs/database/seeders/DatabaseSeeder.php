<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        $adminId = DB::table('users')->insertGetId([
            'name' => 'Admin', 'email' => 'admin@local', 'role' => 'admin',
            'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now(),
        ]);
        $advUserId = DB::table('users')->insertGetId([
            'name' => 'Advertiser', 'email' => 'adv@local', 'role' => 'advertiser',
            'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now(),
        ]);
        $affUserId = DB::table('users')->insertGetId([
            'name' => 'Affiliate', 'email' => 'aff@local', 'role' => 'affiliate',
            'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now(),
        ]);

        $advertiserId = DB::table('advertisers')->insertGetId([
            'user_id' => $advUserId, 'company' => 'Demo Advertiser', 'status' => 'active',
            'postback_url_default' => null, 's2s_secret' => 'adv-secret',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        $affiliateId = DB::table('affiliates')->insertGetId([
            'user_id' => $affUserId, 'company' => 'Demo Affiliate', 'status' => 'active',
            'payment_method' => 'Manual', 'tax_info' => json_encode(['type' => 'individual']),
            'postback_url_template' => 'http://localhost/pb?txid={txid}&status={status}&payout={payout}&sub1={sub1}',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        $offerId = DB::table('offers')->insertGetId([
            'advertiser_id' => $advertiserId, 'name' => 'Demo Offer', 'status' => 'active',
            'goal_type' => 'lead', 'country_whitelist' => json_encode(['US','CA']),
            'device_whitelist' => json_encode(['mobile','desktop']),
            'daily_cap' => 1000, 'monthly_cap' => 20000, 'payout_default' => 1.00, 'currency' => 'USD',
            'redirect_type' => '302', 'preview_url' => 'https://example.com/offer?txid={txid}&sub1={sub1}',
            'terms' => 'Demo terms', 'start_at' => now()->subDay(), 'end_at' => now()->addMonth(),
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // clicks
        for ($i = 0; $i < 50; $i++) {
            $cid = (string) Str::ulid();
            DB::table('clicks')->insert([
                'id' => $cid,
                'offer_id' => $offerId,
                'affiliate_id' => $affiliateId,
                'sub1' => 'test',
                'click_ts' => now(),
                'ip' => '127.0.0.' . ($i % 200),
                'ua' => 'Mozilla/5.0',
                'country' => 'US',
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        // a few conversions
        for ($i = 0; $i < 5; $i++) {
            $convId = (string) Str::ulid();
            $click = DB::table('clicks')->inRandomOrder()->first();
            DB::table('conversions')->insert([
                'id' => $convId,
                'click_id' => $click->id,
                'offer_id' => $offerId,
                'affiliate_id' => $affiliateId,
                'external_txid' => 'ADV-' . (1000 + $i),
                'status' => 'approved',
                'revenue' => 1.50,
                'payout' => 1.00,
                'currency' => 'USD',
                'approved_at' => now(),
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }
    }
}

