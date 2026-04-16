# AGENTS.md

## Project at a glance

- Stack: Next.js App Router + Payload CMS 3 + PostgreSQL (`src/payload.config.ts`, `next.config.js`).
- `withPayload` wraps Next config, so CMS/admin/API and frontend are one app (`next.config.js`).
- Frontend is locale-first routing via `next-intl` (`src/i18n/routing.ts`, `src/proxy.ts`).
- Payload admin route is intentionally obfuscated: `/hallintapaneeli-d064b4f4` (wired in multiple files).

## Architecture map (where behavior lives)

- CMS schema + globals + plugins: `src/payload.config.ts`.
- Content model boundaries: `src/collections/*` (e.g., page composition in `src/collections/Pages/index.ts`).
- Render pipeline: Page docs -> hero/layout blocks -> React components (`src/app/(frontend)/[locale]/[slug]/page.tsx`, `src/heros/RenderHero.tsx`, `src/blocks/RenderBlocks.tsx`).
- Global chrome is Payload-driven and cached (`src/app/(frontend)/[locale]/layout.tsx`, `src/utilities/getGlobals.ts`).
- Redirect resolution is CMS-backed server-side (`src/components/PayloadRedirects/index.tsx`, `src/hooks/revalidateRedirects.ts`).

## Developer workflows (repo-specific)

- Install/start: `pnpm install`, `pnpm dev`.
- Verification before PR: `pnpm lint`, `pnpm test:int`, `pnpm test:e2e` (tests are in `tests/int` and `tests/e2e`).
- After changing Payload schema/admin imports, regenerate artifacts: `pnpm generate:types` and `pnpm generate:importmap`.
- Build flow includes sitemap generation (`postbuild` -> `next-sitemap.config.cjs`), so check sitemap impacts after route/content changes.
- E2E config auto-starts dev server (`playwright.config.ts` `webServer.command: 'pnpm dev'`).

## Codebase conventions you should follow

- TypeScript is strict (`tsconfig.json`), path alias is `@/*` -> `src/*`.
- Locale is always part of frontend paths (`localePrefix: 'always'`); avoid adding locale twice in preview URLs (`src/utilities/generatePreviewPath.ts`).
- Access pattern is explicit per collection (`authenticated`, `authenticatedOrPublished` in `src/access/*`).
- Revalidation is hook-driven after content mutations (`src/collections/Pages/hooks/revalidatePage.ts`).
- Host-specific features are gated by env (`HOSTNAME`, `IS_DEV`) in both schema and rendering (`src/collections/Pages/index.ts`, `src/blocks/RenderBlocks.tsx`).
- Generated Payload app/API files under `src/app/(payload)` declare "DO NOT MODIFY"; treat as generated output.

## Integrations and cross-component coupling

- External services: Bunny storage plugin (`src/plugins/storage-bunny/src`), Plausible script injection (`src/app/(frontend)/[locale]/layout.tsx`), KOK status API (`src/Header/KokStatusIndicator.tsx`).
- Security headers/CSP are centralized in `next.config.js` and differ for public vs admin routes.
- Custom admin redeploy endpoint is Payload-native and auth-guarded (`src/endpoints/redeploy.ts`, button in `src/components/BeforeDashboard/RedeployButton.tsx`).
- Admin route string is duplicated across config/middleware/links/seed; change it atomically or you will break routing.

## Environment and infra caveats

- Runtime env types are documented in `src/environment.d.ts`; update it when introducing new env vars.
- Source of truth DB adapter is PostgreSQL (`postgresAdapter`), while `docker-compose.yml` still references Mongo/yarn (legacy mismatch; validate local infra before relying on compose defaults).
