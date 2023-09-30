<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $user = User::create([
            "email"=>"admin@admin.com",
            "name"=>"admin user",
            "password"=> Hash::make("admin@admin.com"),
            "email_verified_at"=>now()
        ]);

        $adminRole = Role::whereSlug("admin")->first();
        
        $user->roles()->attach($adminRole);

        User::create([
            "email"=>"user@user.com",
            "name"=>"normal user",
            "password"=> Hash::make("normal@normal.com"),
            "email_verified_at"=>now()
        ]);


    }
}
