<?php

use App\Http\Controllers\chat\RoomController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {
    Route::prefix('chat')->group(function () {
        Route::resource('rooms', RoomController::class);
    });
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
