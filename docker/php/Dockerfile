FROM php:8.3-fpm-alpine

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
        bash git curl zip unzip icu-dev oniguruma-dev libzip-dev libpng-dev \
        libjpeg-turbo-dev freetype-dev autoconf g++ make bash openssl \
        mysql-client

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo pdo_mysql mbstring exif pcntl bcmath intl gd zip

# Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# Opcache
RUN docker-php-ext-install opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Configure PHP
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# Create non-root user for development (optional)
RUN addgroup -S laravel && adduser -S laravel -G laravel \
    && chown -R laravel:laravel /var/www/html

USER laravel

CMD ["php-fpm", "-F"]

