<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Menonaktifkan constraint foreign key untuk membersihkan tabel
        Schema::disableForeignKeyConstraints();

        // Membersihkan tabel yang berhubungan dengan kamar
        DB::table('facility_room')->truncate();
        DB::table('rooms')->truncate();
        
        // Mengaktifkan kembali constraint foreign key
        Schema::enableForeignKeyConstraints();

        // Menjalankan seeder
        $this->call([
            FacilitySeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            RoomSeeder::class,
            ReservationSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
