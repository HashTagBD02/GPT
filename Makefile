SHELL := /usr/bin/bash

PROJECT_NAME := cpa

.PHONY: init up down build start stop logs sh app-artisan app-composer app-npm test horizon seed

init: ## Initialize project (copy envs, install deps, migrate, seed)
	cp -n backend/.env.example backend/.env || true
	cp -n frontend/.env.example frontend/.env || true
	docker compose build
	docker compose up -d
	docker compose exec app composer install --no-interaction --prefer-dist
	docker compose exec app php artisan key:generate
	docker compose exec app php artisan migrate --force
	docker compose exec app php artisan db:seed --force
	docker compose exec frontend npm install

up: ## Start containers
	docker compose up -d

down: ## Stop containers
	docker compose down

build:
	docker compose build --no-cache

logs:
	docker compose logs -f --tail=200

sh:
	docker compose exec app bash

app-artisan:
	docker compose exec app php artisan $(cmd)

app-composer:
	docker compose exec app composer $(cmd)

app-npm:
	docker compose exec frontend npm $(cmd)

test:
	docker compose exec app php artisan test || docker compose exec app ./vendor/bin/pest -q

horizon:
	docker compose exec app php artisan horizon

seed:
	docker compose exec app php artisan db:seed --force

