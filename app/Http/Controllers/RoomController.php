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
        $rooms = Room::with(['facilities', 'attachments'])
            ->orderBy('created_at', 'desc')
            ->get();

        $types = Room::distinct('type')->pluck('type');

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms,
            'types' => $types,
        ]);
    }

    public function filter(Request $request)
    {
        $query = Room::query();

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

        // Execute the query
        $rooms = $query->get();

        dd($rooms);

        return;
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
        $room->load(['facilities.default_image', 'reviews.user']);

        return Inertia::render('Rooms/Show', [
            'room' => $room,
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
}
