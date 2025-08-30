<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'clicks';
    protected $fillable = [
        'id','offer_id','affiliate_id','sub1','sub2','sub3','sub4','sub5','click_ts','ip','ua','referer','device','country','gclid','fbclid','tid','session_id','is_bot','dedupe_key','landing_url'
    ];
}

