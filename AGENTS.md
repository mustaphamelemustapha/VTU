# AGENTS.md — VTU Platform AI Agent Guide

This file is the primary reference for AI coding agents (Antigravity, Codex, etc.) working on this repository.

---

## Project Overview

**MELE DATA** (formerly AxisVTU) is a Nigerian VTU SaaS platform. Users buy mobile data, airtime, cable TV subscriptions, electricity tokens, and exam PINs via a wallet-based system. Wallet is funded via Paystack or Monnify bank transfer.

**Live:** `meledata.ng` · `axisvtu.com`

---

## Repository Structure

```
VTU/
├── vtu-backend/                  # FastAPI backend (Python 3.12)
│   ├── app/
│   │   ├── api/v1/endpoints/     # Route handlers (auth, wallet, data, services, admin, ...)
│   │   ├── core/                 # config.py, database.py, security.py, logging.py
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   ├── services/             # Business logic (bills, amigo, paystack, monnify, ...)
│   │   ├── providers/            # Third-party provider adapters (smeplug)
│   │   ├── middlewares/          # Rate limiting
│   │   ├── repositories/         # (reserved for repo pattern)
│   │   ├── dependencies.py       # get_current_user, require_admin
│   │   └── main.py               # App entry point, startup hooks, CORS
│   ├── alembic/                  # Database migrations
│   ├── tests/                    # pytest tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── vtu-frontend/                 # React 18 + Vite SPA (primary web UI)
│   ├── src/
│   │   ├── pages/                # Dashboard, Wallet, Data, Airtime, Cable, Electricity, Exam, ...
│   │   ├── components/           # Shared UI components
│   │   ├── context/              # AuthContext, etc.
│   │   ├── services/             # API client functions
│   │   ├── query/                # TanStack Query hooks
│   │   └── utils/                # Helpers
│   └── vtu-web-next/             # (nested Next.js app — see vtu-web-next/ below)
│
├── vtu-web-next/                 # Next.js 14 web app (auth pages + marketing)
│   └── src/
│       ├── app/                  # App Router pages (login, register, forgot-password, ...)
│       ├── components/           # UI components
│       └── lib/                  # Shared utilities
│
├── axisvtu_flutter/              # Flutter 3.x mobile app (Android + iOS)
│   └── lib/
│       ├── screens/              # All screen widgets
│       ├── services/             # API client (api_client.dart)
│       ├── state/                # Provider state management
│       ├── models/               # Data models
│       ├── widgets/              # Reusable widget components
│       └── utils/                # Utilities
│
├── vtu-static/                   # Static HTML/CSS landing pages
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── TASKS.md
├── README.md
└── AGENTS.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend API | FastAPI 0.110, Python 3.12, SQLAlchemy 2.0, Alembic, Pydantic v1 |
| Database | PostgreSQL (production), SQLite (local dev/test) |
| Auth | JWT (access + refresh tokens), bcrypt passwords, 4-digit transaction PIN |
| Payments | Paystack (card / dedicated account), Monnify (reserved account) |
| Data provider | Amigo API (MTN/GLO), SMEPlug (Airtel), ClubKonnect/VTPass (9mobile/bills) |
| Push notifications | Firebase Cloud Messaging (FCM) via firebase-admin |
| Web SPA | React 18, Vite, TanStack Query v5, React Router v6, Capacitor (mobile PWA) |
| Web marketing | Next.js 14 App Router, Tailwind CSS, Framer Motion |
| Mobile | Flutter 3.x, Provider, firebase_messaging, local_auth (biometric) |
| Rate limiting | slowapi (Redis or in-memory) |
| Deployment | Render.com (backend), Vercel (web), Play Store / App Store (mobile) |

---

## Coding Standards

### Backend (Python)
- **Python 3.12** minimum. Type hints on all new functions.
- Pydantic v1 schemas (project uses `pydantic==1.10.x`). Do **not** use v2 syntax.
- Route handlers stay thin — logic goes into `services/`.
- Use `get_db` dependency injection for all DB access.
- All financial math uses `Decimal`, never `float`.
- New columns added via `_ensure_*` guard functions in `main.py` AND an Alembic migration.
- Wallet operations (`credit_wallet`, `debit_wallet`) must always create a `WalletLedger` entry.
- Idempotency: use `client_request_id` / reference uniqueness to prevent duplicate purchases.
- Failed purchases must auto-refund before raising `HTTPException`.

### Frontend (React/Vite)
- Functional components + hooks only.
- TanStack Query for all server state.
- No direct `fetch` calls — use the service layer in `src/services/`.
- CSS lives in `src/styles.css` (single large file). Prefer adding classes there.

### Next.js
- App Router only (no `pages/` directory).
- Tailwind utility classes for styling.

### Flutter
- Dart null-safety enforced.
- Provider for state management.
- API calls go through `lib/services/api_client.dart`.
- No hardcoded API base URLs — read from `lib/config.dart`.

---

## Build / Run / Test Commands

### Backend
```bash
# Run dev server
cd vtu-backend && uvicorn app.main:app --reload

# Run tests
cd vtu-backend && pytest

# Run migrations
cd vtu-backend && alembic upgrade head

# Compile check (no running server needed)
cd vtu-backend && python3 -m compileall app
```

### Frontend (React/Vite)
```bash
cd vtu-frontend
npm run dev        # dev server on :5173
npm run build      # production build
npx playwright test  # e2e tests
```

### Next.js Web
```bash
cd vtu-web-next
npm run dev        # dev server on :3000
npm run build      # production build
npm run lint       # ESLint
```

### Flutter
```bash
cd axisvtu_flutter
flutter pub get
flutter analyze    # lint check
flutter test       # unit tests
flutter build appbundle   # Android release
flutter build ipa         # iOS release
```

---

## Rules for AI Agents

1. **Read before writing.** Always read the relevant file(s) before editing.
2. **Follow the existing pattern.** Match the style, naming, and patterns already in the file.
3. **Backend changes that add DB columns:** update BOTH `models/` AND add an `_ensure_*` guard in `main.py`. Create an Alembic migration too.
4. **Never use float for money.** Always use `Decimal`.
5. **Test after every backend change:** run `python3 -m compileall app` as a minimum sanity check.
6. **Wallet safety:** wallet debit must happen before provider call. Auto-refund on provider failure.
7. **Provider failures are not always failures.** Transport errors (timeout, connection reset) → mark `PENDING`, not `FAILED`. The pending reconcile worker will resolve them.
8. **Idempotency.** New purchase endpoints must deduplicate on `reference` / `client_request_id`.
9. **Rate limits.** All user-facing mutating endpoints must have `@limiter.limit(...)`.
10. **CORS.** Do not add new origins to `main.py` arbitrarily — add them via env var `CORS_ORIGINS` or the existing allow list.

---

## Things Agents Must NEVER Modify

- `.env` files (read-only; use `.env.example` as reference)
- `firebase-adminsdk.json` (production service account credential)
- `alembic/versions/` — never edit existing migration files; always create new ones
- `vtu-backend/vtu.db` — production SQLite file (should not exist in production)
- Payment webhook signature verification logic in `wallet.py` and `webhooks.py`
- `SECRET_KEY` usage — must remain in `core/security.py` only

---

## Current Roadmap

### P0 — Critical / In Progress
- [x] iOS App Store submission (TestFlight → public)
- Production monitoring & alerting (Render + Vercel health checks)
- Agent reseller dashboard parity (web + Flutter)

### P1 — Next Sprint
- Biometric payment confirmation in Flutter (PIN-first currently)
- Advanced referral dashboard analytics
- Admin broadcast announcement push delivery
- SMEPlug webhook integration for Airtel data delivery confirmation

### P2 — Backlog
- A/B UI experiments
- In-app support chat
- Scheduled/recurring purchases
- Sub-agent hierarchy (agent manages sub-agents)

---

## Known Issues

| ID | Area | Issue | Status |
|---|---|---|---|
| BUG-01 | Flutter | `local_auth` fallback PIN sometimes doesn't clear on cancel | Open |
| BUG-02 | Backend | Amigo "coming soon" errors intermittently returned for valid plans; marked pending (safe) | Mitigated |
| BUG-03 | Frontend | Transaction history on web requires manual refresh after purchase on slow connections | Open |
| BUG-04 | Backend | `wallet/temp-reset` endpoint is public (debug utility) — must be removed or admin-gated before scale | Closed (Admin Gated) |
| BUG-05 | Flutter | `audioplayers` success sound sometimes plays twice on fast purchases | Low priority |
| BUG-06 | Backend | Monnify webhook route is in `wallet.py` (inline) rather than `webhooks.py` — inconsistency | Tech debt |
