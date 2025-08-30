<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversion;
use Illuminate\Http\Request;

class ConversionsController extends Controller
{
    public function index(Request $request)
    {
        $query = Conversion::query()->latest();
        return $query->paginate(20);
    }

    public function approveBulk(Request $request)
    {
        $ids = $request->input('ids', []);
        Conversion::whereIn('id', $ids)->update(['status' => 'approved', 'approved_at' => now()]);
        return response()->json(['ok' => true]);
    }

    public function rejectBulk(Request $request)
    {
        $ids = $request->input('ids', []);
        Conversion::whereIn('id', $ids)->update(['status' => 'rejected', 'rejected_at' => now(), 'reason' => 'manual']);
        return response()->json(['ok' => true]);
    }
}

