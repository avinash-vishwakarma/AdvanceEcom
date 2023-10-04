<?php

namespace App\Models;

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

    
}
