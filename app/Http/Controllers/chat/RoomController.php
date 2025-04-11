<?php

namespace App\Http\Controllers\chat;

use App\Helpers\pr;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class RoomController extends Controller {
    public function index() {
        return  RoomResource::collection(
            Room::with(['users'])
                ->get()
                ->map(function (Room $room) {
                    $room->users = $room->users->unique();
                    return $room;
                },)
        );
    }

    // public function create() {
    // }

    // public function store(Request $request) {
    // }

    public function show(Room $room) {
        return inertia('chat/room/Show', [
            'room' => RoomResource::make($room)
        ]);
    }

    // public function edit(Room $room) {
    // }

    // public function update(Request $request, Room $room) {
    // }

    // public function destroy(Room $room) {
    // }
}
