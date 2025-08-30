<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AffiliatesController extends Controller
{
    public function index(Request $request)
    {
        return DB::table('affiliates')->orderBy('id','desc')->paginate(20);
    }

    public function store(Request $request)
    {
        $id = DB::table('affiliates')->insertGetId(array_merge($request->all(), ['created_at' => now(), 'updated_at' => now()]));
        return response()->json(['id' => $id], 201);
    }

    public function show(int $id)
    {
        $row = DB::table('affiliates')->find($id);
        abort_if(!$row, 404);
        return $row;
    }

    public function update(Request $request, int $id)
    {
        DB::table('affiliates')->where('id', $id)->update(array_merge($request->all(), ['updated_at' => now()]));
        return response()->noContent();
    }

    public function destroy(int $id)
    {
        DB::table('affiliates')->where('id', $id)->delete();
        return response()->noContent();
    }
}

