<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Click;
use Illuminate\Http\Request;

class ClicksController extends Controller
{
    public function index(Request $request)
    {
        $query = Click::query()->latest();
        return $query->paginate(20);
    }
}

