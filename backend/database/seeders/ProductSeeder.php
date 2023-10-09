<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // fields : state , title , heading , description , price , images

        
        $category = Category::find(1);

        for($i = 0 ; $i <= 20 ; $i++){
            $product = Product::create([
                'state'=> "active",
                "title"=>"sample title of product",
                "heading"=>"this is a sample heading of the product thank you for visitin my website good mornning to the sosicnsklfnasd"
                ,"description"=>"this is a sample heading of the product thank you for visitin my website good mornning to the sosicnsklfnasd this is a sample heading of the product thank you for visitin my website good mornning to the sosicnsklfnasd this is a sample heading of the product thank you for visitin my website good mornning to the sosicnsklfnasd",
                "price"=>255+$i
            ]);
    
            for($j = 0 ; $j<= 3 ; $j++){
                $images = new Image([ "path"=>"1696614806_87banner three.jpg" ]);
                $product->images()->save($images);
            }

            $category->products()->attach($product->id);
        }

        

    }
}
