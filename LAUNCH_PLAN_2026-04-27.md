# MELE DATA 12-Day Launch Sprint

- Start date: 2026-04-15
- Launch date: 2026-04-27
- Products in scope: Web app (`vtu-frontend`) + Flutter app (`axisvtu_flutter`, Android launch-first)

## 1) Scope Lock (Day 1)

### Must-Have for Launch (P0)
1. Authentication works end-to-end (register/login/reset) on web + Flutter.
2. Wallet funding works reliably with Paystack dedicated account flow.
3. Data + airtime purchase flows return correct final status (no false fail after success).
4. Receipt generation/share/download works (web + Flutter).
5. Dashboard, wallet, buy flows are mobile-responsive and dark-mode readable.
6. Transaction history shows accurate status and references.
7. Android release AAB is signed and installable from Play internal testing.

### Should-Have (P1)
1. Polished UI consistency across dashboard, wallet, buy data, profile.
2. Faster perceived loading (skeletons/cached data/less blocking states).
3. Better error messages and retry affordances for provider timeout cases.

### Post-Launch (P2)
1. iOS device launch polish (full TestFlight/App Store path).
2. Biometric payment confirmation in Flutter (currently PIN-first).
3. Advanced analytics and A/B UI experiments.

## 2) Launch Gates (non-negotiable)

- No P0 bug open by 2026-04-26.
- Payment webhook reconciliation verified with live transfers.
- Purchase success/failure statuses proven correct with real transactions.
- Dark/light theme contrast passes key screens.
- Rollback + monitoring playbook prepared.

## 3) Day-by-Day Plan

### Day 1 (2026-04-15) — Scope + Baseline
- [x] Lock scope and launch gates.
- [x] Baseline checks:
  - `vtu-frontend`: `npm run build` passed.
  - `axisvtu_flutter`: `flutter analyze` passed.
- [x] Finalize P0 bug board ownership.
- [x] Start P0-04 status mismatch hardening (backend + web airtime flow).

### Day 2-4 (2026-04-16 to 2026-04-18) — Stability Sprint
- Fix and verify all P0 flow bugs.
- Web + Flutter smoke test matrix daily.

### Day 5-6 (2026-04-19 to 2026-04-20) — Payments + Backend Hardening
- Paystack dedicated account generation + webhook reconciliation.
- Provider timeout/failover behavior and user-facing status correctness.

### Day 7-8 (2026-04-21 to 2026-04-22) — Release Packaging
- Android AAB final signing + Play internal testing upload.
- Store listing assets, policy pages, support/contact readiness.

### Day 9-10 (2026-04-23 to 2026-04-24) — Full QA/UAT
- Execute launch test checklist end-to-end.
- Resolve remaining P1 items with low regression risk.

### Day 11 (2026-04-25) — Soft Launch
- Controlled user rollout + monitoring.
- Fix urgent defects only.

### Day 12 (2026-04-26) — Freeze + Launch Prep
- Code freeze for launch branch.
- Final go/no-go checks.

### Launch Day (2026-04-27)
- Public release + hypercare monitoring window (48 hours).

## 4) P0 Bug Board (initial)

| ID | Priority | Area | Issue | Status | Owner |
|---|---|---|---|---|---|
| P0-01 | P0 | Web | Mobile first entry sometimes renders partial/blank content before refresh | Fixed in code (`2b6fb7c`), pending live verification | Dev |
| P0-02 | P0 | Web | Dark mode button contrast not visible in some contexts | Fixed in code (`c58250c`), pending live verification | Dev |
| P0-03 | P0 | Payments | Paystack dedicated account generation/reconciliation must be consistently successful | In progress | Dev + Ops |
| P0-04 | P0 | Provider flow | Purchase occasionally marked failed after actual success (status mismatch) | Patched (backend + web), pending live verification | Dev |
| P0-05 | P0 | Flutter | Wallet/data/receipt parity with web must be verified in production API mode | In progress | Dev |
| P0-06 | P0 | Launch ops | Production monitoring + alerts + rollback checklist | Not started | Dev + Ops |
| P0-07 | P0 | Purchase safety | Wrong network selection must not be allowed to debit (e.g. Airtel line with MTN selected) | Patched (backend + web + flutter), pending live verification | Dev |

## 5) Day 1 Action Checklist (remaining today)

1. Verify P0-01 and P0-02 on live production after deployment cache refresh.
2. Run 5 real transaction tests and compare provider response vs stored transaction status.
3. Confirm Paystack webhook event handling for wallet crediting (dedicated account transfer).
4. Deploy + verify the new pending-confirmation fallback in production.
5. Validate wallet auto-refresh behavior on web + Flutter (15s polling).

## 7) Day 1 Execution Log

- 2026-04-15:
  - Added provider transport-error handling in `vtu-backend/app/api/v1/endpoints/services.py` so uncertain provider/network errors are marked `pending` instead of immediate failed/refunded.
  - Added pending-aware airtime UI behavior in `vtu-frontend/src/pages/Airtime.jsx` to avoid false failure popups during temporary network/provider uncertainty.
  - Validation:
    - `python3 -m compileall app` (backend) ✅
    - `npm run build` (frontend) ✅
  - Added airtime network/phone mismatch protection:
    - Backend now infers Nigerian network from phone prefixes and blocks mismatched selected network before debit.
    - Web airtime form now auto-detects and auto-selects detected network while typing.
    - Flutter airtime now hard-blocks mismatch before PIN/API call and auto-switches to detected network with helper text.
  - Hardened wallet funding reliability:
    - Paystack transfer webhook now resolves user via email, customer lookup fallback, and phone fallback.
    - Added idempotency protection for webhook duplicate deliveries (Paystack + Monnify transfer credit path).
    - Tightened Paystack dedicated account phone validation and canonical storage normalization.
  - Improved credit reflection UX:
    - Web wallet now auto-refreshes wallet/ledger/accounts every 15s while page is visible.
    - Flutter wallet now auto-refreshes wallet/accounts every 15s while screen is active.
  - Validation:
    - `flutter analyze` (axisvtu_flutter) ✅
    - `npm run build` (vtu-frontend) ✅
    - `python3 -m compileall app` (vtu-backend) ✅

## 6) Command Baseline

### Web
- `cd /Users/mustaphamelemustapha/Desktop/VTU/vtu-frontend`
- `npm run build`

### Flutter (Chrome)
- `cd /Users/mustaphamelemustapha/Desktop/VTU/axisvtu_flutter`
- `flutter run -d chrome`

### Flutter (iPhone)
- `cd /Users/mustaphamelemustapha/Desktop/VTU/axisvtu_flutter`
- `COPYFILE_DISABLE=1 COPY_EXTENDED_ATTRIBUTES_DISABLE=1 flutter run -d 00008140-0000396E0110801C --device-vmservice-port=5060 --host-vmservice-port=5060 --no-dds`
