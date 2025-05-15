<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/search', function () {
    return Inertia::render('search-result');
})->name('search-result');

Route::get('/detail', function () {
    return Inertia::render('detail');
})->name('search-result');

Route::resource('/rooms', RoomController::class);

Route::get('/filter', [RoomController::class, 'filter']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
