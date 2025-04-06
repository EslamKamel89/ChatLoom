<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;

class MessageController extends Controller {
    public function index(Request $request) {
        if (! $request->has('room')) return [];
        $slug = $request->room;
        $room = Room::where('slug', $slug)->first();
        return MessageResource::collection(
            $room->messages()->with(['user'])->get()
        );
    }

    // public function create() {
    // }

    // public function store(Request $request) {
    // }

    // public function show(Message $message) {
    // }

    // public function edit(Message $message) {
    // }

    // public function update(Request $request, Message $message) {
    // }

    // public function destroy(Message $message) {
    // }
}
