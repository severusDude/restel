<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::with('default_image')
            ->orderBy('type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Facilities/Index', [
            'facilities' => $facilities,
        ]);
    }
} 