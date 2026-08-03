import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/**
 * Derived from the product registry rather than hand-listed, so an app mounted
 * through publish-liyi-project lands in the sitemap without a second edit —
 * the same reason the homepage index is derived. Local paths in
 * PROFILE.products.apps are exactly the routes this domain serves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const mounted = PROFILE.products.apps
        .map((app) => app.url)
        .filter((url) => url.startsWith("/"))
        .sort();

    return [
        { url: SITE_URL, lastModified },
        ...mounted.map((path) => ({ url: `${SITE_URL}${path}`, lastModified })),
    ];
}
