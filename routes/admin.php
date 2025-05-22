<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\UserController;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Rooms Management
    Route::resource('rooms', RoomController::class);
    
    // Reservations Management
    Route::resource('reservations', ReservationController::class);
    Route::post('reservations/{reservation}/status', [ReservationController::class, 'updateStatus'])->name('reservations.status');
    
    // Users Management
    Route::resource('users', UserController::class);
}); 