<?php

namespace App\Http\Controllers;

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
        return reponse()->json($categorys);
    }
}
