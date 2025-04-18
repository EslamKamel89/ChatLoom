<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;


Broadcast::channel("room.{roomId}", function (User $user, $roomId) {
    return ['id' => $user->id, 'name' => $user->name];
});
// Broadcast::channel("rooms", function ($user,) {
//     return true;
// });
