# Setup Ideal

## 1. Root environment
Copy:
```bash
cp .env.example .env
```

## 2. Backend environment
Masuk ke:
```bash
cd backend/ideal-api
```

Copy:
```bash
cp .env.example .env
```

## 3. Frontend environment
Masuk ke:
```bash
cd frontend/ideal-web
```

Copy:
```bash
cp .env.local.example .env.local
```

## 4. Jalankan Docker
Kembali ke root project:
```bash
docker compose up --build
```

## 5. Kalau mau Laravel asli
Karena folder ini masih scaffold Laravel-style, rename dulu folder lama lalu generate Laravel:
```bash
cd backend
ren ideal-api ideal-api-backup
composer create-project laravel/laravel ideal-api
```
Lalu pindahkan modul atau file yang mau dipakai dari backup ke Laravel baru.
