# Task Management & Backlog — MELE DATA

This document tracks completed, in-progress, and pending engineering tasks for the MELE DATA platform.

---

## 1. High-Priority Next Actions

| Task | Area | Description | Priority |
|---|---|---|---|
| **iOS TestFlight Setup** | Flutter | Upload first iOS build to App Store Connect, configure provisioning profiles. | P0 |
| **Alerting & Monitoring** | Backend | Configure Render/Vercel health checks and auto-pings to Telegram/Slack on 5xx errors. | P0 |
| **Reseller Parity** | Frontend | Port all missing agent reseller dashboard panels from web into Flutter. | P0 |

---

## 2. Completed Tasks

- [x] **Network Validation Guardrails**: Mismatched selected networks vs input phone numbers are blocked on web, Flutter, and backend.
- [x] **Wallet Auto-Refresh**: Context-aware 15-second wallet/ledger auto-refresh when viewport is active.
- [x] **Paystack Webhook Idempotency**: Safe, deduplicated wallet crediting based on Paystack/Monnify external payment references.
- [x] **Transport-Error Graceful Degradation**: Backend marks purchases as `PENDING` rather than `FAILED` on provider timeouts, allowing the background worker to reconcile later without false refunding.
- [x] **Rebrand Re-routing**: Update landing page content and references from AxisVTU to MELE DATA.
- [x] **Secure Temp-Reset Endpoint (BUG-04)**: Admin-gated the `wallet/temp-reset` endpoint to prevent public deletion of cached virtual bank accounts.
- [x] **Primary Documentation Handover**: Created root `README.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/API.md`.

---

## 3. In-Progress Tasks

- [ ] **SMEPlug Webhook Airtel Hookups**: Connecting Airtel data delivery confirmation webhooks to auto-reconcile transactions in real-time.
- [ ] **Admin Announcement Broadcasts**: Building the backend push publisher + frontend banner popups for global system maintenance messages.

---

## 4. Pending Tasks & Backlog

### Phase 1 (Next Sprint)
- [ ] **Biometric PIN Fallback**: Allow Flutter users to confirm transactions using fingerprint/FaceID instead of entering a 4-digit PIN every time.
- [ ] **Referral Dashboard Analytics**: Build charts indicating referral signups, referral earnings, and contribution split histories.

### Phase 2 (Future Sprints)
- [ ] **In-App Live Support Chat**: Embed a messaging widget (Tawk.to or custom socket channel) inside the Flutter and React apps.
- [ ] **Scheduled Recurring Subscriptions**: Enable users to schedule weekly/monthly data or cable TV renewals.
- [ ] **Sub-Agent Hierarchy**: Allow top-tier resellers to provision sub-agents and earn commissions on their transactions.
