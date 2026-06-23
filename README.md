# Real Estate Platform

A full-stack real estate marketplace built with Next.js and Laravel.

## Stack

- Frontend: Next.js App Router, JavaScript, Tailwind CSS, Axios
- Backend: Laravel API, Sanctum, Filament
- Services: PostgreSQL, Redis, Meilisearch, Nginx
- Storage: local Laravel public disk

## Requirements

- Docker
- Docker Compose
- Node.js 20+
- npm

## Setup

Run the following commands to start the local development environment:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
docker compose up -d --build
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate --seed
docker compose exec backend php artisan storage:link
```

If you are using Windows PowerShell, replace the first two commands with:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env.local
```

Start the frontend locally from the `frontend` folder:

```bash
npm install
npm run dev
```

## URLs

- Frontend: `http://localhost:3000`
- API: `http://localhost:8000/api`
- API via Nginx: `http://localhost/api`
- Filament admin: `http://localhost:8000/admin`
- Filament admin via Nginx: `http://localhost/admin`
- Meilisearch: `http://localhost:7700`

The Docker stack now runs the Laravel backend and supporting services only. The Next.js frontend is intended to run locally with `npm run dev`.

## Local Demo Admin

The following credentials are created by the local database seeder and are intended for development only:

```text
Email: admin@example.com
Password: password
```

To create another Filament admin user:

```bash
docker compose exec backend php artisan make:filament-user
```

## Useful Commands

```bash
docker compose ps
docker compose logs -f backend
docker compose exec backend php artisan queue:work
docker compose down
```

## Project Notes

- No TypeScript.
- Property statuses: `draft`, `pending`, `approved`, `rejected`.
- Frontend auth uses Sanctum bearer tokens.
- Property images are stored on the Laravel `public` disk.
