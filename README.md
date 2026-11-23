# Emerald of the Equator — Sprint 5 & 6 development

This branch adds a local tourism service discovery section and a business application workflow to the existing Sprint 4 website. The public directory shows service categories, not unverified named providers.

## Added files
- `registration.js`: browser-side form submission.
- `src/index.js`: Cloudflare Worker API for business applications.
- `schema.sql`: D1 table and index.
- `wrangler.jsonc`: Worker, static assets and D1 binding configuration.

## Required setup before deployment
1. Create a Cloudflare D1 database named `emerald-tourism`.
2. Run `schema.sql` in that database's SQL Console.
3. Copy the database UUID into `wrangler.jsonc`, replacing `REPLACE_WITH_D1_DATABASE_ID`.
4. Create a Cloudflare Turnstile widget for `tourism.fehborganization.org`.
5. Replace `REPLACE_WITH_TURNSTILE_SITE_KEY` in `index.html` with the widget's site key.
6. Add the Turnstile secret to the Worker as an encrypted secret named `TURNSTILE_SECRET`.
7. Deploy using this Wrangler configuration and verify the D1 binding name is exactly `DB` and the assets binding is exactly `ASSETS`.

The API accepts only POST JSON at `/api/business-applications`, checks request origin, validates and bounds submitted fields, checks a honeypot, verifies Turnstile server-side, and inserts applications with status `pending`. It does not expose a public application listing or approval endpoint. No application is automatically published.

## Important
This branch is not ready for production deployment until the database ID and Turnstile keys are configured. Do not merge or deploy the placeholder values. Review privacy notice, data retention, local legal requirements, and the operational process for reviewing applications before public launch. The existing public site remains on `main` until this branch is reviewed and merged.

The existing destination atlas, map, language selector, saved places, visitor guide, FEHB identity and WhatsApp contact are retained from the repository's current main branch. New directory and registration text is initially in English.
