<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function summary(Request $request)
    {
        $query = DB::table('daily_stats');
        if ($request->filled('offer_id')) $query->where('offer_id', $request->offer_id);
        if ($request->filled('affiliate_id')) $query->where('affiliate_id', $request->affiliate_id);
        if ($request->filled('from')) $query->where('date', '>=', $request->from);
        if ($request->filled('to')) $query->where('date', '<=', $request->to);

        $rows = $query->selectRaw('sum(clicks) as clicks, sum(conversions) as conversions, sum(revenue) as revenue, sum(payout) as payout')->first();
        $epc = $rows->clicks ? round($rows->revenue / $rows->clicks, 4) : 0;
        $cr = $rows->clicks ? round($rows->conversions / $rows->clicks, 4) : 0;
        return [
            'clicks' => (int)$rows->clicks,
            'conversions' => (int)$rows->conversions,
            'revenue' => (float)$rows->revenue,
            'payout' => (float)$rows->payout,
            'epc' => $epc,
            'cr' => $cr,
        ];
    }
}

