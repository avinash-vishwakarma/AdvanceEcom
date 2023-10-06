<?php

namespace App\Models;

use App\Traits\ImageTraits;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory , ImageTraits;

    protected $fillable = ['path','type','product_id'];
    
    public $timestamps = false;

    public function product(){
        return belongsTo(Product::class);
    }

}
