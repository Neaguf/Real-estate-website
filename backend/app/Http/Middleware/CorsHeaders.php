<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsHeaders
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            return response('', 204, $this->headers());
        }

        $response = $next($request);

        foreach ($this->headers() as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }

    private function headers(): array
    {
        return [
            'Access-Control-Allow-Origin' => env('FRONTEND_URL', 'http://localhost:3000'),
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        ];
    }
}
