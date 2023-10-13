<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\GenralController;
use App\Http\Controllers\UserCartController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\Custom\CustomAuthController;

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



Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user',[CustomAuthController::class,'user']);
    Route::controller(UserCartController::class)->prefix('/cart')->group(function(){
        Route::get("",'show');
        Route::put("",'update');
        Route::patch("/{id}",'patchUpdate');
        Route::delete("/{id}","delete");
    });
    Route::post("/place-order",[OrderController::class , 'newOrder']);
    Route::post('/confrim-payment',[OrderController::class,'confrimOrder']);
});

Route::controller(GenralController::class)->group(function(){
    Route::get('/banners','getBanners');
    Route::get("/cateogrys",'getCategorys');
    Route::get("/products","getProducts");
    Route::get("/product/{id}",'getProductDetails');
});


