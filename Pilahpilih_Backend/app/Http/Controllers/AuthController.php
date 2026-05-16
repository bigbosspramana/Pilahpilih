<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // ─── Register ────────────────────────────────────────────
    public function register(Request $request)
    {
        $request->validate([
            'full_name'            => 'required|string|max:50',
            'email'                => 'required|email|max:50|unique:users',
            'password'             => 'required|string|min:8|confirmed',
            'phone'                => 'required|string|max:15',
            'address'              => 'required|string',
            'address_detail'       => 'nullable|string',
            'role'                 => 'required|in:buyer,seller',
            'account_type'         => 'required|in:personal,business',
            'store_name'           => 'required_if:account_type,business|nullable|string|max:100',
            'business_type'        => 'required_if:account_type,business|nullable|in:catering,restaurant,bakery,food_stall,other',
            'business_description' => 'nullable|string',
        ]);

        $user = User::create($request->only([
            'full_name', 'email', 'password',
            'phone', 'address', 'address_detail',
            'role', 'account_type', 'store_name',
            'business_type', 'business_description',
        ]));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Registrasi berhasil',
            'user'         => $user,
            'formatted_id' => $user->formatted_id, // USR001, USR002, dst
            'token'        => $token,
        ], 201);
    }

    // ─── Login ───────────────────────────────────────────────
    public function login(Request $request)
    {
        $request->validate([
            'email'     => 'required|email',
            'password'  => 'required|string',
            'fcm_token' => 'nullable|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => 'Email atau password salah.',
            ]);
        }

        $user = Auth::user();

        // Update FCM token jika ada
        if ($request->fcm_token) {
            $user->update(['fcm_token' => $request->fcm_token]);
        }

        // Hapus token lama, buat token baru
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    // ─── Logout ──────────────────────────────────────────────
    public function logout(Request $request)
    {
        // Hapus FCM token agar tidak dapat push notification
        $request->user()->update(['fcm_token' => null]);

        // Hapus token Sanctum
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    // ─── Get Profile ─────────────────────────────────────────
    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('preferences'),
        ]);
    }

    // ─── Update Profile ──────────────────────────────────────
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'full_name'            => 'sometimes|string|max:50',
            'phone'                => 'sometimes|string|max:15',
            'address'              => 'sometimes|string',
            'address_detail'       => 'nullable|string',
            'profile_photo'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'store_name'           => 'nullable|string|max:100',
            'business_type'        => 'nullable|in:catering,restaurant,bakery,food_stall,other',
            'business_description' => 'nullable|string',
        ]);

        $data = $request->only([
            'full_name', 'phone', 'address', 'address_detail',
            'store_name', 'business_type', 'business_description',
        ]);

        // Upload foto profil jika ada
        if ($request->hasFile('profile_photo')) {
            // Hapus foto lama jika ada
            if ($user->profile_photo) {
                MediaService::delete($user->profile_photo);
            }
            $data['profile_photo'] = MediaService::uploadProfilePhoto(
                $request->file('profile_photo'),
                $user->id
            );
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'user'    => $user->fresh(),
        ]);
    }

    // ─── Update FCM Token ────────────────────────────────────
    public function updateFcmToken(Request $request)
    {
        $request->validate([
            'fcm_token' => 'required|string',
        ]);

        $request->user()->update([
            'fcm_token' => $request->fcm_token,
        ]);

        return response()->json([
            'message' => 'FCM token berhasil diperbarui',
        ]);
    }
}
