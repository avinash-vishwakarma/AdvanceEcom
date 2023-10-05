<?php

namespace App\Http\Controllers\Admin;

use App\Models\Image;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;


class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cateogryID = $request->query("category");
        if($cateogryID){
            $productsWithCategorys = Category::with('products')->findOrFail($cateogryID);
            return response()->json($productsWithCategorys);
        }

        $products = Product::with('categorys')->all();
        return respnose()->json($products);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // requird data to create a product
        $request->validate([
            "title"=>"required | max:255",
            "description"=>"required",
            "price"=>"required",
            "state"=>"required",
            "categorys"=>"required",
            "heading"=>"required"
        ]);
        $product = Product::create($request->except("categorys"));
        $product->addImages($request->files);
        $product->categorys()->attach(json_decode($request->categorys));
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::with(["categorys","images"])->findOrFail($id);
        return response()->json($product);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "title"=>"required | max:255",
            "description"=>"required",
            "price"=>"required",
            "state"=>"required",
            "categorys"=>"required",
            "heading"=>"required"
        ]);

        $Updatedproduct = Product::findOrFail($id);
        $Updatedproduct->update($request->except('categorys'));
        $Updatedproduct->addImages($request->files);
        $Updatedproduct->categorys()->sync(json_decode($request->categorys));
        return response()->json($Updatedproduct);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request , $id)
    {

        $isImage = $request->query("image");

        if($isImage){
            $image = Image::findOrFail($id);
            if(File::exists(public_path("/images/ProductImages/").$image->path)){
                File::delete(public_path("/images/ProductImages/").$image->path);
            }
            // $image->delete();
            return response()->json(["message"=>"Image Deleted"]);
        }

        $product = Product::findOrFail($id);
        foreach($product->images as $image){
            if(File::exists(public_path("/images/ProductImages/").$image->path)){
                File::delete(public_path("/images/ProductImages/").$image->path);
            }
        }
        $product->categorys()->detach();
        $product->delete();
        return response()->json([ "message"=>"Product Deleted Successfully" ]);
    }
}
