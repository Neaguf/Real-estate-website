<?php

return [
    'default' => env('CACHE_STORE', 'database'),
    'stores' => [
        'array' => ['driver' => 'array'],
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],
        'redis' => [
            'driver' => 'redis',
            'connection' => 'cache',
        ],
    ],
    'prefix' => env('CACHE_PREFIX', 'real_estate_cache'),
];
