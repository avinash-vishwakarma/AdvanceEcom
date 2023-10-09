<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BannerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        for($i = 0 ; $i<3 ; $i++){
            DB::table('banner_images')->insert([
                'path'=>"1696597304_Banner44banner three.jpg",
                'href'=>"some"
            ]);
        }
    }
}
