<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversion extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'conversions';
    protected $fillable = [
        'id','click_id','offer_id','affiliate_id','external_txid','status','revenue','payout','currency','approved_at','rejected_at','reason','postbacked_at','meta'
    ];
    protected $casts = [
        'meta' => 'array'
    ];
}

