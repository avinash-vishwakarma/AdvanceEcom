<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserCartController extends Controller
{
    public function addToCart(Request $request){
        $request->validate([
            'product_id'=>"required",
            "quantity"=>"required"
        ]);
        // check if product alredy exists in the cart increase the 
        $authUser = Auth::user();
        $addingProduct = Product::findOrFail($request->product_id);
        if($existingProduct = $authUser->cart()->where("product_id",$addingProduct->id)->first()){
            // update quantitiy and total
            $existingProduct->quantity = $existingProduct->quantity + $request->quantity;
            $existingProduct->total = ($existingProduct->quantity * $addingProduct->price);
            $existingProduct->save();
        }else{
            // create a new cart item
            $newCartItem = new Cart([
                "product_id"=>$addingProduct->id,
                "quantity"=>$request->quantity,
            ]);
            $newCartItem->total = ($request->quantity * $addingProduct->price);
            $authUser->cart()->save($newCartItem);
        }
        // new cart item added 
        return response()->json(["status"=>"item added to cart"]);
    }
}
