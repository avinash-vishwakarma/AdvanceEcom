<?php

namespace App\Http\Controllers\Auth\Custom;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomAuthController extends Controller
{
    public function user(Request $request){
        $user = User::with(['roles'=>function($query){
            $query->select(['name','slug']);
        }])->find($request->user()->id);
        return $user;
    }
}
