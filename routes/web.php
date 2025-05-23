<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReservationController;
use App\Models\Room;

Route::get('/', function () {
    // Ambil data kamar langsung dari model
    $rooms = Room::with('facilities')
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();
    
    // Hitung rata-rata rating dan tambahkan featured image jika diperlukan
    $rooms->each(function ($room) {
        $room->average_rating = $room->getAverageRating();
        
        if (!$room->featured_image) {
            $room->featured_image = "https://source.unsplash.com/random/400x250/?hotel,room," . $room->id;
        }
    });

    return Inertia::render('home', [
        'featuredRooms' => $rooms
    ]);
})->name('home');

Route::get('/search', function () {
    return Inertia::render('search-result');
})->name('search-result');

Route::get('/detail', function () {
    return Inertia::render('detail');
})->name('detail');

Route::resource('/rooms', RoomController::class);

Route::get('/filter', [RoomController::class, 'filter'])->name('rooms.filter');

// Auth required routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Reservation routes
    Route::resource('reservations', ReservationController::class)->only(['index', 'store', 'show']);
    Route::post('reservations/{reservation}/confirm', [ReservationController::class, 'confirm'])->name('reservations.confirm');
    Route::post('reservations/{reservation}/cancel', [ReservationController::class, 'cancel'])->name('reservations.cancel');
    
    // Review routes
    Route::post('reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::put('reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
