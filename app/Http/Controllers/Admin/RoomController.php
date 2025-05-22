<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::with('facilities')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => $rooms
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facilities = Facility::all();
        
        return Inertia::render('Admin/Rooms/Create', [
            'facilities' => $facilities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'facilities' => 'nullable|array',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        // Create the room
        $room = Room::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name'] . '-' . $validated['location']),
            'description' => $validated['description'] ?? '',
            'type' => $validated['type'],
            'capacity' => $validated['capacity'],
            'location' => $validated['location'],
            'price' => $validated['price'],
        ]);

        // Handle featured image
        if ($request->hasFile('featured_image')) {
            $room->addMediaFromRequest('featured_image')
                ->toMediaCollection('featured');
        }

        // Attach facilities
        if (isset($validated['facilities']) && !empty($validated['facilities'])) {
            $room->facilities()->sync($validated['facilities']);
        }

        return redirect()->route('admin.rooms.index')
            ->with('success', 'Room created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $room->load(['facilities', 'reservations.reservation.user']);
        
        return Inertia::render('Admin/Rooms/Show', [
            'room' => $room
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        $room->load('facilities');
        $facilities = Facility::all();
        
        return Inertia::render('Admin/Rooms/Edit', [
            'room' => $room,
            'facilities' => $facilities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'facilities' => 'nullable|array',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        // Update the room
        $room->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name'] . '-' . $validated['location']),
            'description' => $validated['description'] ?? '',
            'type' => $validated['type'],
            'capacity' => $validated['capacity'],
            'location' => $validated['location'],
            'price' => $validated['price'],
        ]);

        // Handle featured image
        if ($request->hasFile('featured_image')) {
            $room->clearMediaCollection('featured');
            $room->addMediaFromRequest('featured_image')
                ->toMediaCollection('featured');
        }

        // Sync facilities
        if (isset($validated['facilities'])) {
            $room->facilities()->sync($validated['facilities']);
        } else {
            $room->facilities()->detach();
        }

        return redirect()->route('admin.rooms.index')
            ->with('success', 'Room updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        // Check if room has active reservations
        $hasActiveReservations = $room->reservations()
            ->whereHas('reservation', function($query) {
                $query->whereIn('status', ['pending', 'confirmed']);
            })
            ->exists();
            
        if ($hasActiveReservations) {
            return back()->with('error', 'Cannot delete room with active reservations');
        }
        
        // Delete the room
        $room->facilities()->detach();
        $room->clearMediaCollection('featured');
        $room->delete();
        
        return redirect()->route('admin.rooms.index')
            ->with('success', 'Room deleted successfully');
    }
} 