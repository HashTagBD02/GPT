<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('caps:reset')->dailyAt('00:05');
        $schedule->command('stats:backfill')->dailyAt('00:10');
    }
}

