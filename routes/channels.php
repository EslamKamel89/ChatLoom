<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;


Broadcast::channel("room.{roomId}", function (User $user, $roomId) {
    return true;
});
// Broadcast::channel("rooms", function ($user,) {
//     return true;
// });
