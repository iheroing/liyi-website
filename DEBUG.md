# Homepage regression investigation

## Observations

- Production HTML declares both `/favicon.ico` and `/icon.png`.
- `src/app/favicon.ico` is the default multi-size ICO, while `src/app/icon.png` is the intended custom 1024px image.
- Commit `5e6beec` reintroduced `src/app/favicon.ico` while adding Vercel Analytics; commit `1d293b6` had explicitly removed it earlier.
- `/guokao` and `/guokao/:path*` are correctly mounted in `next.config.ts`.
- The homepage application data in `src/lib/data.ts` has no Guokao entry, so the route can work while its homepage introduction is absent.

## Hypotheses

### H1: The default favicon file overrides the custom metadata icon (confirmed root)
- Supports: production emits both icon declarations and the default ICO was reintroduced after its intentional removal.
- Conflicts: none.
- Test: inspect production icon links and compare file history and hashes.

### H2: Next.js 16.2.10 changed icon precedence
- Supports: the user noticed the issue after the upgrade.
- Conflicts: the duplicate favicon existed before the upgrade and the upgrade commit did not touch either image.
- Test: inspect the upgrade diff and earlier icon history.

### H3: The Guokao rewrite is broken
- Supports: the Guokao project appears missing to the user.
- Conflicts: route tests and production checks show `/guokao` is mounted.
- Test: inspect `next.config.ts` and route contract tests.

### H4: The homepage Guokao card is missing from its data source (confirmed root)
- Supports: `PROFILE.products.apps` has no Guokao item.
- Conflicts: none.
- Test: search current and historical `src/lib/data.ts` for `国考` and `/guokao`.

## Experiments

- No production code changed during diagnosis.
- Git history proved the upgrade commit did not modify homepage data or icon assets.
- Production HTML inspection proved duplicate icon declarations.
- Source inspection proved the route exists but the homepage card does not.

## Root Cause

An unrelated Analytics commit reintroduced Next's default favicon, and the later Guokao route restoration omitted the separate homepage application entry.

## Fix

- Remove the unintended default `favicon.ico` so only the custom icon is emitted.
- Restore a Guokao application card linked to `/guokao`.
- Add homepage contract tests that prevent either regression.

---

# Shenlun production 404 investigation — 2026-07-16

## Observations

- `https://www.liyi.online/` returns 200, `/guokao` returns 200, and `/icon.png` returns 200.
- `https://www.liyi.online/shenlun` and `/shenlun-api/materials` both return 404.
- The independent Sites backend materials API returns 200, so stored content and ingestion are available.
- `www.liyi.online` currently aliases deployment `dpl_DpXrsQRBYEevqVgF4pXcGyjA7cq8`, created after the Shenlun deployment.
- That deployment reports source commit `75e7cd4`, message `Personal site should surface the poetry dice app`, `source: cli`, `gitDirty: 1`, and actor `codex`.
- Commit `75e7cd4` predates the commit that introduced `/shenlun` and the later first-response and warning-status improvements.

## Hypotheses

### H1: A later CLI deployment from an outdated checkout replaced the production alias (ROOT HYPOTHESIS)
- Supports: the current production deployment is newer but identifies the old `75e7cd4` source commit and has no Shenlun route.
- Conflicts: none.
- Test: compare `/shenlun` on the last known-good deployment URL with the current production deployment URL.

### H2: The Shenlun backend is down
- Supports: users experience the feature as unavailable.
- Conflicts: the independent materials API returns 200 and current data.
- Test: request the backend API directly.

### H3: The custom domain or DNS is broken
- Supports: the user reports the website is down.
- Conflicts: root, Guokao, and favicon all return 200 through the same domain.
- Test: compare routes on the same host and inspect the active alias target.

### H4: The current main branch removed the route
- Supports: a production 404 can be caused by route deletion.
- Conflicts: `main` contains `/shenlun`, the proxy rewrite, and route contract tests.
- Test: build the current branch and inspect its route manifest.

## Experiments

- The last known-good deployment `liyi-website-h7wfzo2gt-iheroings-projects.vercel.app` returns 200 for both `/shenlun` and `/shenlun-api/materials`.
- The current alias target `liyi-website-mwgip2dfx-iheroings-projects.vercel.app` returns 404 for both routes.
- The independent Sites backend returns 200, and current `main` passes all route tests and builds with `/shenlun` in the route manifest.
- Result: H1 confirmed; H2, H3, and H4 rejected.

## Root Cause

A later Codex CLI deployment was created from the dirty, outdated `75e7cd4` checkout and replaced the production aliases after the complete Shenlun version had already been published.

## Fix

- Restore production aliases to the verified complete deployment.
- Re-run route health checks for `/`, `/shenlun`, `/shenlun-api/materials`, `/guokao`, and `/icon.png`.
- Keep this incident record so future deployment work checks the active alias source commit, not only whether a Vercel build is green.
- Harden `publish-liyi-project` with a mandatory canonical-checkout and commit-provenance gate before editing and before deployment.
- Remove the hourly production schedule; keep manual and post-push verification so prevention stays in the publishing path instead of recurring alerts.
