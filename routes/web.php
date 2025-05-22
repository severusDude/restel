<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;


Route::get('/', [RoomController::class, 'index'])->name('home');

Route::get('/search', function () {
    return Inertia::render('search-result');
})->name('search-result');

Route::get('/detail', [RoomController::class, 'show'])->name('detail');

Route::get('/rooms/filter', [RoomController::class, 'filter'])->name('rooms.filter');
Route::resource('/rooms', RoomController::class);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// require __DIR__ . '/settings.php';
// require __DIR__ . '/auth.php';
