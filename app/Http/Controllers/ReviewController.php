<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReservationItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'reservation_item_id' => 'required|exists:reservation_items,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
        ]);

        // Check if the reservation item belongs to the user
        $reservationItem = ReservationItem::findOrFail($request->reservation_item_id);
        if ($reservationItem->reservation->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Check if the reservation is completed
        if ($reservationItem->reservation->status !== 'confirmed') {
            return back()->with('error', 'Cannot review a non-confirmed reservation.');
        }

        // Check if review already exists
        if ($reservationItem->review) {
            return back()->with('error', 'You have already reviewed this item.');
        }

        // Create review
        $review = new Review();
        $review->user_id = Auth::id();
        $review->reservation_item_id = $request->reservation_item_id;
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->save();

        return back()->with('success', 'Review submitted successfully.');
    }

    public function update(Request $request, Review $review)
    {
        // Check if the review belongs to the authenticated user
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
        ]);

        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->save();

        return back()->with('success', 'Review updated successfully.');
    }

    public function destroy(Review $review)
    {
        // Check if the review belongs to the authenticated user
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $review->delete();

        return back()->with('success', 'Review deleted successfully.');
    }
} 