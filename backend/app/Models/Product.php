<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Image;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable =["title","price","description","state",'heading'];

    protected $hidden = ['pivot'];

    public function categorys(){
        return $this->belongsToMany(Category::class);
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function addImages($files){
        // save all the file in side the public folder 
        foreach ($files as $file) {
            $fileName = time()."_".rand(10,1000).$file->getClientOriginalName();
            $file->move(public_path("images/ProductImages/"),$fileName);
            $Image = new Image([ "path"=>$fileName ]);
            $this->images()->save($Image);
        }
        return $this;
    }
    
    
}
