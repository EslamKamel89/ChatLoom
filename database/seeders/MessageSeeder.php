<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        /** @var Collection<int , Room> */
        $rooms = Room::all();
        $rooms->each(function (Room $room) {
            Message::factory()->count(1000)->sequence(function (Sequence $sequence) use ($room) {
                return [
                    'room_id' => $room->id,
                    'user_id' => $sequence->index % 2 == 0 ? 1 : 2,
                    'content' => "Message {$sequence->index} in room {$room->title}",
                    'created_at' => now()->subYear()->addMinutes($sequence->index),
                    'updated_at' => now()->subYear()->addMinutes($sequence->index),
                ];
            })->create();
        });
    }
}
