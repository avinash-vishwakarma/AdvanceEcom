<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;

trait ImageTraits {
    
    public function deleteWithImage($path){
        $fileFullPath = public_path($path).$this->path;
        if(File::exists($fileFullPath)){
            File::delete($fileFullPath);
            return $this->delete();
        }
    }

}