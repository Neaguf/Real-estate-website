<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $request->user()->favorites()->syncWithoutDetaching([$property->id]);

        return response()->json(['message' => 'Added to favorites']);
    }

    public function destroy(Request $request, Property $property)
    {
        $request->user()->favorites()->detach($property->id);

        return response()->json(['message' => 'Removed from favorites']);
    }
}
