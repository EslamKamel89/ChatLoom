<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller {
    public function index() {
        return RoomResource::collection(
            Room::all(),
        );
    }

    // public function create() {
    // }

    // public function store(Request $request) {
    // }

    public function show(Room $room) {
    }

    // public function edit(Room $room) {
    // }

    // public function update(Request $request, Room $room) {
    // }

    // public function destroy(Room $room) {
    // }
}
