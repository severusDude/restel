<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Reservation::with(['user', 'items.reservable']);
        
        // Filter by status if provided
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }
        
        // Filter by date range if provided
        if ($request->has('start_date') && !empty($request->start_date)) {
            $query->where('start_date', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && !empty($request->end_date)) {
            $query->where('end_date', '<=', $request->end_date);
        }
        
        // Order by latest
        $reservations = $query->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations,
            'filters' => $request->all()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load([
            'user', 
            'items.reservable', 
            'items.review'
        ]);
        
        return Inertia::render('Admin/Reservations/Show', [
            'reservation' => $reservation
        ]);
    }

    /**
     * Update reservation status.
     */
    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);
        
        $oldStatus = $reservation->status;
        $reservation->status = $request->status;
        $reservation->save();
        
        // If confirming a reservation that was previously pending
        if ($oldStatus === 'pending' && $request->status === 'confirmed') {
            // You could add notification logic here
        }
        
        return back()->with('success', 'Reservation status updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        // Only allow deletion if the reservation is cancelled
        if ($reservation->status !== 'cancelled') {
            return back()->with('error', 'Only cancelled reservations can be deleted');
        }
        
        // Delete related reviews and reservation items
        foreach ($reservation->items as $item) {
            if ($item->review) {
                $item->review->delete();
            }
        }
        
        $reservation->items()->delete();
        $reservation->delete();
        
        return redirect()->route('admin.reservations.index')
            ->with('success', 'Reservation deleted successfully');
    }
}
