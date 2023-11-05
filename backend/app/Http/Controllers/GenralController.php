<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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
        $product;
        $response=[];
        $sort = $request->query('sort');

        switch($sort){
            case ("lth"):
                $sort = ['price'=>'asc'];
            break;
            case ("htl"):
                $sort = ["price"=>'desc'];
                break;
            default:
            $sort = ['updated_at'=>'asc'];
        }


        if($catId = $request->query("category")){
            // get products according to the categorys
            $category = Category::findOrFail($catId);
            $response['category']= $category;
            $product = $category->products()->with('images')->where("state","active");
        }elseif($searchText = $request->query("search")){
            $response['search_text'] = $searchText;
            $product = Product::getValidProducts()->where(function($query) use ($searchText){
                $query->where("title","LIKE","%".$searchText."%");
                $query->orWhere("heading","LIKE","%".$searchText."%");
            });
        }


        foreach($sort as $key=>$value){
            $product->orderBy($key,$value);
        }
        $response['products']=$product->paginate(10);
        return response()->json($response);
    }


    public function getProductDetails($id){
        $product = Product::with(['images','categorys'])->where(["id"=>$id , "state"=>"active"])->first();
        return response()->json($product);
    }


}
