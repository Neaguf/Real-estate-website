<?php

return [
    'driver' => env('SCOUT_DRIVER', 'collection'),
    'prefix' => env('SCOUT_PREFIX', ''),
    'queue' => env('SCOUT_QUEUE', false),
    'after_commit' => false,
    'chunk' => ['searchable' => 500, 'unsearchable' => 500],
    'meilisearch' => [
        'host' => env('MEILISEARCH_HOST', 'http://localhost:7700'),
        'key' => env('MEILISEARCH_KEY'),
        'index-settings' => [],
    ],
];
