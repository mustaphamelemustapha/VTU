# MELE DATA — VTU Platform

Nigeria's VTU (Virtual Top-Up) SaaS platform. Buy data, airtime, cable TV, electricity, and exam PINs instantly.

**Live domains:** `meledata.ng` · `axisvtu.com`

---

## Repository Layout

```
VTU/
├── vtu-backend/          # FastAPI Python backend (primary API)
├── vtu-frontend/         # React + Vite SPA (web app)
├── vtu-web-next/         # Next.js 14 web app (marketing / auth pages)
├── axisvtu_flutter/      # Flutter mobile app (Android + iOS)
├── vtu-static/           # Static assets / landing pages
└── docs/                 # Architecture, API, and task docs
```

---

## Quick Start

### Backend

```bash
cd vtu-backend
cp .env.example .env          # fill in secrets
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

API runs on `http://localhost:8000`. Docs at `/docs`.

### Frontend (React/Vite)

```bash
cd vtu-frontend
cp .env.example .env
npm install
npm run dev                   # http://localhost:5173
```

### Web (Next.js)

```bash
cd vtu-web-next
cp .env.example .env
npm install
npm run dev                   # http://localhost:3000
```

### Flutter

```bash
cd axisvtu_flutter
flutter pub get
flutter run                   # choose device/emulator
```

---

## Environment Variables (Backend)

Copy `.env.example` → `.env`. Key variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | JWT signing key |
| `PAYSTACK_SECRET_KEY` | Paystack live/test key |
| `MONNIFY_API_KEY` / `MONNIFY_SECRET_KEY` | Monnify keys |
| `AMIGO_BASE_URL` / `AMIGO_API_KEY` | Data purchase provider |
| `SMEPLUG_API_KEY` | Airtel data provider |
| `CLUBKONNECT_USER_ID` / `CLUBKONNECT_API_KEY` | Bills provider |
| `BILLS_PROVIDER` | `auto` \| `clubkonnect` \| `vtpass` \| `mock` |
| `BOOTSTRAP_ADMIN_EMAILS` | Comma-separated emails to auto-promote to admin |

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Backend | Render.com | Docker or native Python |
| Frontend | Vercel | `vtu-frontend` project |
| Next.js web | Vercel | `vtu-web-next` project |
| Flutter | Play Store / App Store | Build via `flutter build appbundle` |

---

## Running Tests

```bash
# Backend
cd vtu-backend
pytest

# Frontend E2E
cd vtu-frontend
npx playwright test
```

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — System design, auth flow, payment flow
- [API Reference](docs/API.md) — All endpoints with examples
- [Tasks](docs/TASKS.md) — Roadmap and known issues
- [AGENTS.md](AGENTS.md) — AI agent rules and coding standards
