# MELE DATA Rebrand Runbook

## Brand System

- Public brand: MELE DATA
- Parent/developer identity: MMTECHGLOBE
- Recommended footer text: Powered by MMTECHGLOBE
- Tone: modern, reliable, affordable, fast, Nigerian-focused, youth-friendly, fintech-inspired

## Production Safety Rules

- Keep Android `applicationId` and iOS bundle identifiers unchanged.
- Keep existing package paths, Firebase identifiers, keystore variables, database schema, account references, storage keys, API routes, and payment-provider integration IDs stable.
- Change user-visible text, marketing copy, legal copy, email subjects/templates, notifications, app display names, metadata, icons, splash/onboarding visuals, and receipt/support wording.
- Keep old domains and env variable names active during transition until the new domain and infrastructure are fully verified.

## Updated Areas

- Flutter app display name, iOS display name, splash/onboarding/auth/profile/wallet/receipt/support strings, notification fallbacks, permission text, store copy, and launcher/brand image assets.
- Website and frontend titles, SEO metadata, hero/CTA text, privacy/legal pages, receipts, nav labels, install prompts, PWA manifest, favicons, and footer attribution.
- Backend email subjects/templates, sender display name, and default public email branding.
- Documentation and launch/readiness references that mention the public brand.

## Intentionally Preserved

- `com.mmtechglobe.axisvtu` package/application identifiers.
- `AXISVTU_*` virtual account references and related tests.
- `axisvtu_*` local storage/cache keys.
- `AXISVTU_*` environment variables for API base and keystore configuration.
- Existing `axisvtu.com` URLs until DNS, Play Console, email, and backend allowlists are migrated.
- Existing source-level class names such as `AxisVTUApp` where changing them would be cosmetic and higher risk.

## Deployment Strategy

1. Ship a normal app update under the existing Play Store listing.
2. Keep the package name and signing key unchanged.
3. Update Play Console app name, icon, screenshots, short description, full description, privacy policy, and feature graphic.
4. Deploy backend first if email/template changes are included.
5. Deploy website/frontend after backend verification.
6. Release Flutter mobile app update after web/backend smoke tests pass.
7. Announce: "AxisVTU is now MELE DATA. Same account, wallet, and services. New name."

## Recommended Commit Structure

1. `rebrand: update mobile app public branding`
2. `rebrand: update web branding and metadata`
3. `rebrand: update backend email and notification branding`
4. `rebrand: refresh brand assets`
5. `docs: add MELE DATA rollout checklist`

## Production Checks

- Confirm installed app name is MELE DATA.
- Confirm launcher icon, splash screen, onboarding, login, dashboard, wallet, profile, receipts, notifications, and support flows show MELE DATA.
- Confirm login, refresh token, wallet funding, purchases, receipts, referrals, transaction PIN, password reset, push notifications, and admin flows still work.
- Confirm Play Store package, signing key, Firebase, Monnify/Paystack, database tables, and webhook endpoints are unchanged.
- Confirm emails show MELE DATA sender/subject/body.
- Confirm web pages, SEO tags, PWA manifest, favicon, social previews, privacy/terms/refund/KYC pages, and footer attribution are updated.
- Confirm old AxisVTU public copy is gone except preserved technical identifiers.
