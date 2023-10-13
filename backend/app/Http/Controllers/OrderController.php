<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Razorpay\Api\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class OrderController extends Controller
{
    public function newOrder(){
        $usercart = Cart::getCartData();
        $api = new Api(Config::get('values.razorpay_id'),Config::get('values.razorpay_secret_key'));        
        $options = [
            "amount"=>$usercart['total'] * 100,
            "currency"=>"INR",
            "payment_capture" => 1
        ];
        $razorPayResponse = $api->order->create($options);
        $response = ["currency"=>$razorPayResponse->currency,"amount"=>$razorPayResponse->amount , "id"=>$razorPayResponse->id];
        return response()->json($response);
    }

    public function confrimOrder(Request $request){
        $request->validate([
            "razorpay_order_id"=>"required",
            "razorpay_payment_id"=>"required",
            "razorpay_signature"=>"required"
        ]);

        $api = new Api(Config::get('values.razorpay_id'),Config::get('values.razorpay_secret_key'));        
        $paymentStatus = $api->payment->fetch($request->razorpay_payment_id);
        
        dd($paymentStatus);
        

    }

}
