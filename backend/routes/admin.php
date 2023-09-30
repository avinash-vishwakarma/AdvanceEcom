<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




// admin routes

Route::middleware(['auth:sanctum','can:admin'])->prefix('/admin')->group(function(){
    // admin category routes
    Route::resource('/category',AdminCategoryController::class)->except(['create',"edit"]);
});
