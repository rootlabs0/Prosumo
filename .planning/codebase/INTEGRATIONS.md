# External Integrations

**Analysis Date:** 2026-05-05

## APIs & External Services

**None detected.**

No external API calls, SDK imports, or third-party service integrations exist in the current source code. The codebase is a purely static marketing/landing site with no runtime HTTP requests to external services.

References to "REST API, webhooks, and typed SDKs" in `prosumo/src/sections/UseCases.tsx` and "open APIs" in `prosumo/src/sections/Capabilities.tsx` are marketing copy describing the PROSUMO product, not actual integrations present in this frontend codebase.

## Data Storage

**Databases:** None — no database client, ORM, or connection string is present.

**File Storage:** None — no file upload or cloud storage integration.

**Caching:** None.

## Authentication & Identity

**Auth Provider:** None — no login, session, or token management exists in the current codebase.

Contact CTA links to `mailto:hello@prosumo.cz` via a plain HTML `<a href="mailto:...">` in `prosumo/src/sections/Contact.tsx`. No form submission or backend endpoint is involved.

## Monitoring & Observability

**Error Tracking:** None — no Sentry, Datadog, or similar SDK present.

**Analytics:** None — no Google Analytics, Plausible, Fathom, or similar script present.

**Logs:** Browser console only (no structured logging library).

## CI/CD & Deployment

**Hosting:** Not configured in codebase — no `vercel.json`, `netlify.toml`, `.github/workflows/`, or Dockerfile detected.

**CI Pipeline:** None detected.

**Build output:** `prosumo/dist/` — static files suitable for any static host.

## Environment Configuration

**Required env vars:** None — no `import.meta.env.*` references or `process.env.*` usage found in source.

**`.env` files:** None present in repo.

## Webhooks & Callbacks

**Incoming:** None.

**Outgoing:** None.

## External Asset Dependencies

**Google Fonts (CDN):**
- Loaded via `<link>` tags in `prosumo/index.html`
- Families: Inter, IBM Plex Mono
- Source: `https://fonts.googleapis.com` + `https://fonts.gstatic.com`
- This is the only external network dependency at runtime.
- Preconnect hints are set for both origins.

## Notes for Future Integration Work

The site currently uses a `mailto:` link for demo booking. Future phases likely require:
- A form submission endpoint or CRM integration (HubSpot, Pipedrive, etc.)
- Analytics integration (user tracking for demo conversions)
- Possible backend API for the PROSUMO platform product itself

---

*Integration audit: 2026-05-05*
