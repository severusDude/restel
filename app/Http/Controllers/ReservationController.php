<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\ReservationItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Auth::user()->reservations()->with('items.reservable', 'items.review')->latest()->get();
        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations
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
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $room = Room::findOrFail($request->room_id);

        // Check if room is available for the requested dates
        $isAvailable = $this->checkRoomAvailability($room->id, $request->start_date, $request->end_date);
        
        if (!$isAvailable) {
            return back()->with('error', 'Room is not available for the selected dates');
        }

        // Calculate total price based on number of nights
        $startDate = new \DateTime($request->start_date);
        $endDate = new \DateTime($request->end_date);
        $interval = $startDate->diff($endDate);
        $nights = $interval->days;
        $totalPrice = $room->price * $nights;

        // Create reservation
        $reservation = new Reservation();
        $reservation->user_id = Auth::id();
        $reservation->start_date = $request->start_date;
        $reservation->end_date = $request->end_date;
        $reservation->status = 'pending';
        $reservation->total_price = $totalPrice;  // Set calculated total price
        $reservation->save();

        // Create reservation item
        $item = new ReservationItem();
        $item->reservation_id = $reservation->id;
        $item->reservable_id = $room->id;
        $item->reservable_type = Room::class;
        $item->price = $room->price; // Store the current room price
        $item->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Reservation created successfully',
                'redirect' => route('reservations.show', $reservation->id)
            ]);
        }

        return redirect()->route('reservations.show', $reservation->id)
            ->with('success', 'Reservation created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        // Check if the reservation belongs to the authenticated user
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }

        $reservation->load('items.reservable', 'items.review');
        
        return Inertia::render('Reservations/Show', [
            'reservation' => $reservation
        ]);
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
        //
    }

    public function confirm(Reservation $reservation)
    {
        // In a real system, this would be called after payment confirmation
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }

        $reservation->status = 'confirmed';
        $reservation->save();

        return redirect()->route('reservations.show', $reservation->id)
            ->with('success', 'Reservation confirmed successfully');
    }

    public function cancel(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }

        $reservation->status = 'cancelled';
        $reservation->save();

        return redirect()->route('reservations.index')
            ->with('success', 'Reservation cancelled successfully');
    }

    private function checkRoomAvailability($roomId, $startDate, $endDate)
    {
        // Count existing confirmed reservations for the same room and overlapping dates
        $overlappingReservations = ReservationItem::where('reservable_id', $roomId)
            ->where('reservable_type', Room::class)
            ->whereHas('reservation', function ($query) use ($startDate, $endDate) {
                $query->where('status', 'confirmed')
                    ->where(function ($q) use ($startDate, $endDate) {
                        // Check for date overlaps
                        $q->whereBetween('start_date', [$startDate, $endDate])
                            ->orWhereBetween('end_date', [$startDate, $endDate])
                            ->orWhere(function ($q) use ($startDate, $endDate) {
                                $q->where('start_date', '<=', $startDate)
                                    ->where('end_date', '>=', $endDate);
                            });
                    });
            })
            ->count();

        return $overlappingReservations === 0;
    }
}
