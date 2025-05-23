<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::with('facilities')->get();

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms
        ]);
    }

    public function filter(Request $request)
    {
        $query = Room::query()->with('facilities');

        // Filter by capacity if provided
        if ($request->has('capacity')) {
            $query->where('capacity', '>=', $request->capacity)->orderBy('capacity', 'asc');
        }

        // Filter by price range if provided
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by type if provided
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // Filter by location if provided
        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Execute the query
        $rooms = $query->get();

        return Inertia::render('Rooms/SearchResults', [
            'rooms' => $rooms,
            'filters' => $request->all()
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $room->load(['facilities', 'reviews.user']);

        // Get room availability for the next 30 days
        $today = now();
        $thirtyDaysLater = $today->copy()->addDays(30);
        
        // Get unavailable dates (dates with confirmed reservations)
        $unavailableDates = $room->reservations()
            ->whereHas('reservation', function ($query) {
                $query->where('status', 'confirmed');
            })
            ->with('reservation')
            ->get()
            ->flatMap(function ($item) {
                $startDate = \Carbon\Carbon::parse($item->reservation->start_date);
                $endDate = \Carbon\Carbon::parse($item->reservation->end_date);
                
                // Generate all dates between start and end
                $dates = [];
                for ($date = $startDate; $date->lte($endDate); $date->addDay()) {
                    $dates[] = $date->format('Y-m-d');
                }
                
                return $dates;
            })
            ->unique()
            ->values()
            ->all();

        return Inertia::render('Rooms/Show', [
            'room' => $room,
            'rating' => $room->getAverageRating(),
            'unavailableDates' => $unavailableDates
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }

    /**
     * Get featured rooms for homepage
     */
    public function featured()
    {
        try {
            $rooms = Room::with(['facilities', 'reviews']) // Include reviews for rating calculation
                ->orderBy('created_at', 'desc') // Get newest rooms first as fallback
                ->limit(5)
                ->get();
            
            if ($rooms->isEmpty()) {
                // If no rooms are found, return a helpful message
                return response()->json([
                    'rooms' => [],
                    'message' => 'No rooms available at this time.'
                ], 200);
            }
            
            // Calculate average rating for each room
            $rooms->each(function ($room) {
                $room->average_rating = $room->getAverageRating();
                
                // Ensure each room has a featured image, even if it's a placeholder
                if (!$room->featured_image) {
                    $room->featured_image = "https://source.unsplash.com/random/400x250/?hotel,room," . $room->id;
                }
            });
            
            return response()->json([
                'rooms' => $rooms,
                'success' => true
            ]);
        } catch (\Exception $e) {
            // // Log the error for debugging
            // \Log::error('Error fetching featured rooms: ' . $e->getMessage());
            
            // Return a user-friendly error response
            return response()->json([
                'rooms' => [],
                'message' => 'Failed to load rooms. Please try again later.',
                'success' => false
            ], 500);
        }
    }
}
