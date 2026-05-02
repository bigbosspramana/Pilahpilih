<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Builder;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Fix foreign key constraint dengan string primary key
        Builder::defaultStringLength(191);
    }
}
