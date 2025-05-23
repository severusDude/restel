<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get counts for dashboard statistics
        $stats = [
            'rooms' => Room::count(),
            'users' => User::count(),
            'reservations' => [
                'total' => Reservation::count(),
                'pending' => Reservation::where('status', 'pending')->count(),
                'confirmed' => Reservation::where('status', 'confirmed')->count(),
                'cancelled' => Reservation::where('status', 'cancelled')->count(),
            ],
            'revenue' => [
                'total' => Reservation::where('status', 'confirmed')->sum('total_price'),
                'monthly' => Reservation::where('status', 'confirmed')
                    ->whereMonth('created_at', now()->month)
                    ->sum('total_price'),
            ]
        ];

        // Get latest reservations
        $latestReservations = Reservation::with(['user', 'items.reservable'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'latestReservations' => $latestReservations
        ]);
    }
} 