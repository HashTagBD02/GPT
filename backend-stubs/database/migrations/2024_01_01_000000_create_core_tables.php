<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('role');
            $table->string('password');
            $table->string('two_factor_secret')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('company');
            $table->string('status');
            $table->string('payment_method')->nullable();
            $table->json('tax_info')->nullable();
            $table->string('postback_url_template')->nullable();
            $table->timestamps();
        });

        Schema::create('advertisers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('company');
            $table->string('status');
            $table->string('postback_url_default')->nullable();
            $table->string('s2s_secret');
            $table->timestamps();
        });

        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advertiser_id')->constrained();
            $table->string('name');
            $table->string('status');
            $table->string('goal_type')->nullable();
            $table->json('country_whitelist')->nullable();
            $table->json('device_whitelist')->nullable();
            $table->integer('daily_cap')->nullable();
            $table->integer('monthly_cap')->nullable();
            $table->decimal('payout_default', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->string('redirect_type')->default('302');
            $table->string('preview_url')->nullable();
            $table->text('terms')->nullable();
            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();
            $table->timestamps();
        });

        Schema::create('offer_targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained();
            $table->string('country')->nullable();
            $table->string('device')->nullable();
            $table->decimal('payout_override', 10, 2)->nullable();
            $table->integer('cap_override')->nullable();
            $table->timestamps();
        });

        Schema::create('tracking_domains', function (Blueprint $table) {
            $table->id();
            $table->string('domain')->unique();
            $table->boolean('ssl_verified')->default(false);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('clicks', function (Blueprint $table) {
            $table->string('id', 26)->primary(); // ULID
            $table->foreignId('offer_id')->constrained();
            $table->foreignId('affiliate_id')->constrained();
            $table->string('sub1')->nullable();
            $table->string('sub2')->nullable();
            $table->string('sub3')->nullable();
            $table->string('sub4')->nullable();
            $table->string('sub5')->nullable();
            $table->timestamp('click_ts')->useCurrent();
            $table->string('ip')->nullable();
            $table->text('ua')->nullable();
            $table->text('referer')->nullable();
            $table->string('device')->nullable();
            $table->string('country', 2)->nullable();
            $table->string('gclid')->nullable();
            $table->string('fbclid')->nullable();
            $table->string('tid')->nullable();
            $table->string('session_id')->nullable();
            $table->boolean('is_bot')->default(false);
            $table->string('dedupe_key')->nullable()->index();
            $table->text('landing_url')->nullable();
            $table->timestamps();
        });

        Schema::create('conversions', function (Blueprint $table) {
            $table->string('id', 26)->primary();
            $table->string('click_id', 26)->index();
            $table->foreignId('offer_id')->constrained();
            $table->foreignId('affiliate_id')->constrained();
            $table->string('external_txid')->nullable();
            $table->enum('status', ['pending','approved','rejected'])->default('pending');
            $table->decimal('revenue', 10, 2)->nullable();
            $table->decimal('payout', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->string('reason')->nullable();
            $table->timestamp('postbacked_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->unique(['offer_id','external_txid']);
        });

        Schema::create('postback_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('direction', ['inbound','outbound']);
            $table->text('url')->nullable();
            $table->json('payload')->nullable();
            $table->integer('response_code')->nullable();
            $table->text('response_body')->nullable();
            $table->boolean('signed')->default(false);
            $table->timestamps();
        });

        Schema::create('caps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained();
            $table->foreignId('affiliate_id')->nullable()->constrained();
            $table->enum('period', ['daily','monthly']);
            $table->integer('limit');
            $table->integer('consumed')->default(0);
            $table->timestamp('resets_at');
            $table->timestamps();
            $table->unique(['offer_id','affiliate_id','period']);
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained();
            $table->string('period');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3);
            $table->string('method');
            $table->json('details')->nullable();
            $table->enum('status', ['pending','processing','paid'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });

        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->boolean('plain_shown_once')->default(false);
            $table->string('hash');
            $table->json('scopes')->nullable();
            $table->timestamps();
        });

        Schema::create('webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('event');
            $table->text('target_url');
            $table->string('secret')->nullable();
            $table->boolean('enabled')->default(true);
            $table->timestamps();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('action');
            $table->string('entity');
            $table->string('entity_id');
            $table->json('diff')->nullable();
            $table->string('ip')->nullable();
            $table->timestamps();
        });

        Schema::create('daily_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained();
            $table->foreignId('affiliate_id')->constrained();
            $table->date('date');
            $table->unsignedInteger('clicks')->default(0);
            $table->unsignedInteger('conversions')->default(0);
            $table->decimal('revenue', 10, 2)->default(0);
            $table->decimal('payout', 10, 2)->default(0);
            $table->decimal('epc', 10, 4)->default(0);
            $table->decimal('cr', 10, 4)->default(0);
            $table->timestamps();
            $table->unique(['offer_id','affiliate_id','date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_stats');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('webhooks');
        Schema::dropIfExists('api_keys');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('caps');
        Schema::dropIfExists('postback_logs');
        Schema::dropIfExists('conversions');
        Schema::dropIfExists('clicks');
        Schema::dropIfExists('tracking_domains');
        Schema::dropIfExists('offer_targets');
        Schema::dropIfExists('offers');
        Schema::dropIfExists('advertisers');
        Schema::dropIfExists('affiliates');
        Schema::dropIfExists('users');
    }
};

