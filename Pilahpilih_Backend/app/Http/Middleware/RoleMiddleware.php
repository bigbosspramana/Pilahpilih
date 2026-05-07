<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        // Cek user sudah login
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        // Cek role sesuai
        if ($request->user()->role !== $role) {
            return response()->json([
                'message' => 'Akses ditolak. Anda tidak memiliki izin.',
            ], 403);
        }

        return $next($request);
    }
}
