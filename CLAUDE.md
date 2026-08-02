# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Odette FE is the frontend for a restaurant/venue management system (tables, song requests, screen takeover, feedback, DJ music approval, cashier billing) built on the Vuexy MUI Next.js admin template. It's a multi-role app: **user** (guest scanning a table QR), **dj**, **cashier**, **admin**, and **superuser** ("su") each have separate route trees and dashboards.

## Commands

- `pnpm dev` — start the dev server (uses pnpm; see `pnpm-lock.yaml` and `.npmrc`)
- `pnpm build` — production build (also regenerates PWA service worker via `next-pwa`)
- `pnpm lint` / `pnpm lint:fix` — Next.js/ESLint
- `pnpm format` — Prettier over `src/**/*.{js,jsx,ts,tsx}`
- `pnpm build:icons` — regenerates Iconify icon CSS bundle (`src/assets/iconify-icons/bundle-icons-css.ts`); runs automatically via `postinstall`
- No test suite is configured in this repo.

## Architecture

### Route groups map to roles, enforced twice

`src/app` uses Next.js route groups: `(authenticated)/{user,dj,cashier,admin,su}/...`, `(blank-layout-pages)/login`, `(dashboard)`. Each `page.tsx` is a thin wrapper that renders a component from `src/features/**` — put logic in the feature, not the page.

Role-based access is enforced in **two independent layers** that must be kept in sync when routes change:
1. `src/middleware.ts` — server-side redirect logic based on role read from the JWT cookie (`getRoleFromJWT` in `src/utils/auth.ts`) and `STORAGE_KEY` cookies. Route prefixes (`/user`, `/su`, `/dj`, `/home`, etc.) are hardcoded here.
2. `src/app/AuthProvider.tsx` + `src/hooks/auth.ts` + `src/configs/authConfig.ts` — client-side gate using `matcher`/`AuthRedirecting` maps keyed by role, checked against `localStorage` flags per role.

Note: admin and superuser share the `/su` route prefix ("admin dan su ada di satu route").

### Feature module pattern

Each feature under `src/features/<role>/<feature-name>/` follows a consistent layered structure:
- `types/` — TS types for the feature's data
- `services/` — raw API calls via `api()` from `src/utils/api.ts`, using URL templates from `src/data/internal/api-route.ts` (`API_URL`)
- `hooks/` — TanStack Query wrappers (`useQuery`/`useInfiniteQuery`/`useMutation`) around the services, keyed via `src/data/internal/query-keys.ts` (`QUERY_KEY`)
- `components/` — presentational pieces
- `index.tsx` — the feature's root component, imported directly by the route's `page.tsx`

When adding a new feature, follow this same services → hooks → components → index.tsx layering rather than calling `api()` straight from components.

### Central registries (`src/data/internal/`)

Route strings, API endpoint strings, query-cache keys, and storage keys are centralized rather than inlined:
- `app-route.ts` (`APP_URL`) — internal navigation paths
- `api-route.ts` (`API_URL`) — backend endpoint paths (`:id`-style placeholders)
- `query-keys.ts` (`QUERY_KEY`) — react-query cache keys
- `storage.ts` (`STORAGE_KEY`) — localStorage/cookie key names (token, session, table, user name)

Always add new routes/endpoints/keys here instead of hardcoding strings in features.

### API client

`src/utils/api.ts` wraps axios in a `RequestConfig(...)` factory (`baseUrl`, `getToken`, `onForceLogout`); the app-wide singleton is exported as `api`. It attaches a `Bearer` token from `localStorage` unless `noAuth: true`, and auto-logs-out on a `401` response (clears token/session, shows a toast, unless already on `/login`). Some endpoints (guest/user song-request flows) use `noAuth: true` with a separate `X-Session-Token` header sourced from `STORAGE_KEY.USER_SESSION` instead of the bearer token — this is the pattern for anonymous per-table sessions.

### `@ozanplanviu/planviu-core`

A private shared package providing common types (e.g. `TPaginationResponseType`) and mutation helper types (`MutateParamsType`, `MutationFunctionType`) used throughout `hooks/` files. Check it before redefining generic pagination/mutation types locally.

### `src/@pv/`

Project-local shared building blocks that don't belong in a specific feature: reusable hooks (`use-debounce`, `use-filter`, `use-infinite-scroll[-v2]`, `use-query-params`), form/table/layout components, and validation utils.

### Template internals (`@core`, `@layouts`, `@menu`)

`src/@core`, `src/@layouts`, `src/@menu` are largely vendored from the Vuexy MUI template (theming, layout shell, menu system). Prefer composing around them rather than modifying deeply unless a template-level bug requires it.

### Path aliases

Defined in `tsconfig.json`: `@/*` → `src/*`, plus dedicated aliases `@core/*`, `@layouts/*`, `@menu/*`, `@assets/*`, `@components/*`, `@configs/*`, `@views/*`. There is no alias for `@pv`, `@data`, `@features`, `@hooks`, `@utils`, or `@types` — import those via `@/pv/...`, `@/data/...`, etc.

### Import ordering

ESLint enforces `import/order`: builtin → external → internal/parent/sibling/index → object/unknown, with blank lines between groups (`newlines-between: always-and-inside-groups`). Run `pnpm lint:fix` after reordering imports manually.

### State/data fetching

- Server data: TanStack Query (`@tanstack/react-query`), one hook file per feature under `hooks/`.
- Client/local state: Jotai atoms where needed.
- Auth/session state is read from `localStorage`/cookies directly (via `STORAGE_KEY`), not from a global store — see `src/hooks/auth.ts`.

### PWA

The app is a PWA via `@ducanh2912/next-pwa` (configured in `next.config.mjs`, service worker emitted to `public/`). `src/hooks/pwa.ts` (`useIsPWA`) detects standalone/installed mode for conditional UI (e.g. `(blank-layout-pages)/pwa`, `src/features/pwa`).
