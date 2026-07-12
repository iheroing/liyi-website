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
