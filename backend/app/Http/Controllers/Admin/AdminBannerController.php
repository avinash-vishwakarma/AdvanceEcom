<?php

namespace App\Http\Controllers\Admin;

use App\Models\BannerImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banners = BannerImage::all()->toArray();
        return response()->json($banners);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // multiple files 


        foreach($request->files as $file){
            $fileName = time()."_Banner".rand(10,100).$file->getClientOriginalName();
            $file->move(public_path('/images/Banners/'),$fileName);
            // savent the data in the data base
            BannerImage::create([
                "path"=>$fileName,
            ]);
        }

        $images = BannerImage::all()->toArray();
        return response()->json($images);
    }





    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $image = BannerImage::findOrFail($id);
        $image->deleteWithImage("images/banners/");
        $images = BannerImage::all()->toArray();
        return response()->json($images);
    }
}
