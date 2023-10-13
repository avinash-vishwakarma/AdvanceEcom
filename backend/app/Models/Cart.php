<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['product_id','price','quantity'];


    public function user(){
       return $this->belongsTo(User::class);
    }

    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }

    public static function getCartData(){
        $cart = Auth::user()->cart()->with(['product'=>function($query){
            $query->select('title','price','id')->with('images');
        }])->get();

        $cartValue = Auth::user()->cart()->sum('total');

        return response()->json([ 'cart'=>$cart , "total"=>$cartValue ]);
    }

}
