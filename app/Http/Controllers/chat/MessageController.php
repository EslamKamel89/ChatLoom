<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageStoreRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;

class MessageController extends Controller {
    public function index(Request $request) {
        if (! $request->has('room')) return (object) [];
        $slug = $request->room;
        $room = Room::where('slug', $slug)->first();
        return MessageResource::collection(
            $room->messages()
                ->with(['user'])
                ->latest()
                ->paginate(10)
        );
    }

    public function store(MessageStoreRequest $request) {
        $room = Room::where('slug', $request->slug)->firstOrFail();
        $message = Message::create([
            'user_id' => auth()->id(),
            'room_id' => $room->id,
            'content' => $request->content,
        ]);
        return MessageResource::make($message->load(['user']));
    }

    // public function create() {
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
