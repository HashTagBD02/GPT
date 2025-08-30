#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

if [ ! -f artisan ]; then
  composer create-project laravel/laravel . "^11.0" --no-interaction
fi

composer require laravel/sanctum:^4.0 laravel/horizon:^5.0 maatwebsite/excel:^3.1 darkaonline/l5-swagger:^9.0 predis/predis:^2.0 --no-interaction
composer require --dev pestphp/pest:^3.0 pestphp/pest-plugin-laravel:^3.0 nunomaduro/collision:^8.0

php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
php artisan vendor:publish --provider="Laravel\Horizon\HorizonServiceProvider"
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Ensure storage and cache directories are writable
php artisan storage:link || true

# Copy stubs into app
STUB_DIR=/var/www/html-stubs
if [ -d "$STUB_DIR" ]; then
  rsync -av --exclude vendor --exclude node_modules "$STUB_DIR"/ .
fi

php artisan migrate --force
php artisan db:seed --force

echo "Backend initialized."

