/**
 * Slugs this domain serves from *other* deployments, via the rewrites in
 * next.config.ts.
 *
 * These are not routes of this app. A request for one is proxied to a separate
 * Vercel deployment that knows nothing about React Server Components, so Next's
 * own prefetch — `/atomizer?_rsc=…` — comes back 404 and every page load fills
 * the console with errors. Navigation to them has to be a full document load
 * either way, so links to anything listed here must be plain anchors rather
 * than <Link>.
 *
 * /shenlun is deliberately absent: it is a real page in this app, and client
 * navigation to it works.
 *
 * tests/route-contracts.test.mjs keeps this list and the rewrite table in sync,
 * so a newly mounted app cannot start prefetching 404s unnoticed.
 */
export const MOUNTED_ROUTES = [
    "/poetry-dice",
    "/guokao",
    "/ai-trainer",
    "/snowflake",
    "/atomizer",
] as const

/** True for a URL this domain proxies to another deployment. */
export function isMounted(url: string): boolean {
    return MOUNTED_ROUTES.some((route) => url === route || url.startsWith(`${route}/`))
}
