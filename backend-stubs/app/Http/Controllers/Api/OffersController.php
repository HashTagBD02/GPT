<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OffersController extends Controller
{
    public function index(Request $request)
    {
        $offers = DB::table('offers')->orderBy('id','desc')->paginate(20);
        return $offers;
    }

    public function store(Request $request)
    {
        $id = DB::table('offers')->insertGetId(array_merge($request->all(), [
            'created_at' => now(), 'updated_at' => now()
        ]));
        return response()->json(['id' => $id], 201);
    }

    public function show(int $id)
    {
        $offer = DB::table('offers')->find($id);
        abort_if(!$offer, 404);
        return $offer;
    }

    public function update(Request $request, int $id)
    {
        DB::table('offers')->where('id', $id)->update(array_merge($request->all(), ['updated_at' => now()]));
        return response()->noContent();
    }

    public function destroy(int $id)
    {
        DB::table('offers')->where('id', $id)->delete();
        return response()->noContent();
    }
}

