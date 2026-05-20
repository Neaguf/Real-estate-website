<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'city_id' => ['required', 'exists:cities,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:20'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'address' => ['nullable', 'string', 'max:255'],
            'rooms' => ['nullable', 'integer', 'min:1', 'max:20'],
            'surface' => ['nullable', 'numeric', 'min:1'],
            'status' => ['nullable', 'in:draft,pending'],
        ];
    }
}
