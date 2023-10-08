<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\BannerImage;
use Illuminate\Http\Request;

class GenralController extends Controller
{
    //

    public function getBanners(){
        $banners = BannerImage::all()->toArray();
        return response()->json($banners);
    }

    public function getCategorys(){
        $categorys = Category::all()->toArray();
        return response()->json($categorys);
    }

    public function getProducts(Request $request){
        // case one cateogorys
        $products = [];
        $response = [];
        if($catId = $request->query("category")){
            $cateory = Category::findOrFail($catId);
           $products = $cateory->products()->with('images')->where(["state"=>"active"])->paginate(10);
           $response = [ "cateory"=>$cateory , "products"=>$products ];
        }
        return response()->json($response);
    }


    public function getProductDetails($id){
        $product = Product::with(['images','categorys'])->where(["id"=>$id , "state"=>"active"])->first();
        return response()->json($product);
    }
}
