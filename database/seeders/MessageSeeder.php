<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        /** @var Collection<int , Room> */
        $rooms = Room::all();
        $rooms->each(function (Room $room) {
        });
    }
}
