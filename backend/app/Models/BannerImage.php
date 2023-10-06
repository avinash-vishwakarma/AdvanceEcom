<?php

namespace App\Models;

use App\Traits\ImageTraits;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BannerImage extends Model
{
    use  HasFactory , ImageTraits;

    protected $fillable = ["path"];
}
