# Phase 14 Reliability Matrix

## Transaction PIN
- [ ] First-time setup creates hashed PIN only
- [ ] PIN mismatch blocks setup with clean message
- [ ] Wrong PIN increments attempt counter
- [ ] PIN locks after max failed attempts
- [ ] Locked PIN shows calm retry message
- [ ] PIN change requires current PIN
- [ ] PIN reset link opens PIN reset flow
- [ ] Reset token expires cleanly
- [ ] No wallet debit can bypass PIN verification

## Wallet Funding
- [ ] Dedicated account exists or shows safe generation state
- [ ] Funding webhook credit is idempotent
- [ ] Duplicate webhook does not double-credit wallet
- [ ] Pending funding can refresh without errors
- [ ] Failed funding does not create a false credit
- [ ] Wallet refresh after funding reflects final balance

## Buy Data / Debits
- [ ] Successful purchase debits wallet once
- [ ] Failed purchase auto-refunds once
- [ ] Timeout pending state is shown clearly
- [ ] Duplicate purchase submit reuses request id and does not duplicate debit
- [ ] Receipt reference matches history and detail
- [ ] Notification title/status matches transaction state

## Airtime / Cable / Electricity / Exam
- [ ] PIN verification happens before debit
- [ ] Successful purchase is idempotent on retry
- [ ] Pending provider confirmation is surfaced calmly
- [ ] Failed provider response refunds once
- [ ] Receipt/history/detail stay in sync

## Password / Recovery
- [ ] Forgot password sends reset link, not OTP
- [ ] Reset password link goes to password flow
- [ ] Reset PIN link goes to PIN flow
- [ ] Invalid email shows calm validation
- [ ] Resend reset link works

## Notifications / History
- [ ] New transaction appears in history
- [ ] Notification opens the right destination
- [ ] Unread/read state persists
- [ ] Duplicate notifications are not created for the same transaction
- [ ] Empty state is calm and useful

## Network / UI Stability
- [ ] Slow network shows loading state
- [ ] Offline/API failure shows friendly retry message
- [ ] Buttons re-enable after failures
- [ ] Sheets/dialogs dismiss cleanly and re-open safely
- [ ] Background/return resumes screen state without duplication
