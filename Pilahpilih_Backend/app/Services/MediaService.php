<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    // Upload foto/video pesan
    public static function uploadMessageMedia(UploadedFile $file, string $senderId): array
    {
        $extension = $file->getClientOriginalExtension();
        $mediaType = self::getMediaType($extension);
        $folder    = "messages/{$senderId}";
        $filename  = Str::uuid() . ".{$extension}";

        $path = $file->storeAs($folder, $filename, 'public');

        return [
            'media_url'  => Storage::url($path),
            'media_type' => $mediaType,
        ];
    }

    // Upload foto profil user
    public static function uploadProfilePhoto(UploadedFile $file, string $userId): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename  = "profile_{$userId}.{$extension}";
        $path      = $file->storeAs('profiles', $filename, 'public');

        return Storage::url($path);
    }

    // Upload foto produk
    public static function uploadProductPhoto(UploadedFile $file, string $productId): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename  = "product_{$productId}.{$extension}";
        $path      = $file->storeAs('products', $filename, 'public');

        return Storage::url($path);
    }

    // Hapus file lama
    public static function delete(string $url): void
    {
        $path = str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
        Storage::disk('public')->delete($path);
    }

    private static function getMediaType(string $extension): string
    {
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];

        if (in_array(strtolower($extension), $imageExtensions)) {
            return 'image';
        }

        if (in_array(strtolower($extension), $videoExtensions)) {
            return 'video';
        }

        return 'image'; // default
    }
}
