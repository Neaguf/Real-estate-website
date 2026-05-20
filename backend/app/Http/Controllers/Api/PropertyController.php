<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PropertyImageRequest;
use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::query()
            ->with(['city', 'category', 'images'])
            ->where('status', Property::STATUS_APPROVED)
            ->latest();

        $query->when($request->city, fn ($q, $city) => $q->where('city_id', $city));
        $query->when($request->category, fn ($q, $category) => $q->where('category_id', $category));
        $query->when($request->min_price, fn ($q, $price) => $q->where('price', '>=', $price));
        $query->when($request->max_price, fn ($q, $price) => $q->where('price', '<=', $price));
        $query->when($request->rooms, fn ($q, $rooms) => $q->where('rooms', $rooms));

        return response()->json($query->paginate(12));
    }

    public function show(Property $property)
    {
        if ($property->status !== Property::STATUS_APPROVED && auth('sanctum')->id() !== $property->user_id) {
            abort(404);
        }

        return response()->json($property->load(['user', 'city', 'category', 'images']));
    }

    public function store(PropertyRequest $request)
    {
        $property = $request->user()->properties()->create([
            ...$request->validated(),
            'status' => $request->input('status', Property::STATUS_PENDING),
        ]);

        return response()->json($property->load(['city', 'category', 'images']), 201);
    }

    public function update(PropertyRequest $request, Property $property)
    {
        $this->authorize('update', $property);

        $property->update($request->validated());

        return response()->json($property->fresh(['city', 'category', 'images']));
    }

    public function destroy(Property $property)
    {
        $this->authorize('delete', $property);

        $property->delete();

        return response()->json(['message' => 'Property deleted']);
    }

    public function uploadImages(PropertyImageRequest $request, Property $property)
    {
        $this->authorize('update', $property);

        foreach ($request->file('images') as $index => $image) {
            $path = $image->store('properties/'.$property->id, 'public');
            $property->images()->create([
                'path' => $path,
                'sort_order' => $index,
            ]);
        }

        return response()->json($property->fresh('images'));
    }
}
