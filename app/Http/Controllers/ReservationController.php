<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\ReservationItem;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with(['items.room', 'user'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Check if room is available for the selected dates
        $conflictingReservations = ReservationItem::whereHas('reservation', function ($query) use ($validated) {
            $query->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($validated) {
                    $query->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                        ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']])
                        ->orWhere(function ($query) use ($validated) {
                            $query->where('start_date', '<=', $validated['start_date'])
                                ->where('end_date', '>=', $validated['end_date']);
                        });
                });
        })->where('room_id', $room->id)->exists();

        if ($conflictingReservations) {
            return back()->withErrors([
                'dates' => 'The room is not available for the selected dates.',
            ]);
        }

        // Calculate total price
        $startDate = new \DateTime($validated['start_date']);
        $endDate = new \DateTime($validated['end_date']);
        $days = $startDate->diff($endDate)->days;
        $totalPrice = $room->price * $days;

        DB::beginTransaction();

        try {
            $reservation = Reservation::create([
                'user_id' => auth()->id(),
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            ReservationItem::create([
                'reservation_id' => $reservation->id,
                'room_id' => $room->id,
                'price' => $room->price,
            ]);

            DB::commit();

            return redirect()->route('reservations.index')
                ->with('success', 'Reservation created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors([
                'error' => 'An error occurred while creating your reservation.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        if ($reservation->user_id !== auth()->id()) {
            abort(403);
        }

        if ($reservation->status !== 'pending') {
            return back()->withErrors([
                'error' => 'Only pending reservations can be cancelled.',
            ]);
        }

        $reservation->update(['status' => 'cancelled']);

        return back()->with('success', 'Reservation cancelled successfully.');
    }
}
