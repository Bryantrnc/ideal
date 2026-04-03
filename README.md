# Ideal

Monorepo starter untuk website **Ideal** — sistem pakar analisis berat badan ideal dengan fokus UI/UX, responsive design, dan clean architecture.

## Struktur
- `backend/ideal-api`
- `frontend/ideal-web`

## Stack
- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- Backend: Laravel-style API scaffold
- Database: MySQL
- Container: Docker Compose

## Quick Start
1. Copy file environment:
   - root: `.env.example` -> `.env`
   - backend: `backend/ideal-api/.env.example` -> `.env`
   - frontend: `frontend/ideal-web/.env.local.example` -> `.env.local`
2. Jalankan Docker:
   ```bash
   docker compose up --build
   ```
3. Untuk backend production-ready, generate Laravel asli di folder `backend/ideal-api`.
