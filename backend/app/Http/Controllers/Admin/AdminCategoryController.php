<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AdminCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // send all the categorys
        $category = Category::orderBy("updated_at","desc")->get();
        return response()->json($category);
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>"required | max:255 ",
            'icon'=>"required | max:255"
        ]);

        $slug = str_replace(" ","-",strtolower($request->name));
        $createdCategory = Category::create([
            'name'=>$request->name,
            'slug'=>$slug,
            'icon'=>$request->icon
        ]);

        return response()->json($createdCategory);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Category::findOrFail($id);
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
        //


        $request->validate([
            "name"=>"required | max : 255 ",
            "icon"=>"required ",
        ]);

        $slug = str_replace(" ","-",strtolower($request->name));

        $category = Category::findOrFail($id)->update([
            "name"=>$request->name,
            "icon"=>$request->icon,
            "slug"=>$slug
        ]);

        return response()->json($category);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return response()->json(["status"=>"success"]);
    }
}
