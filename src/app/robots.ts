import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everything is public and meant to be found, so the policy is allow-all.
 *
 * The AI crawlers are still listed one by one because they are not one switch:
 *   OAI-SearchBot  — powers ChatGPT Search results and citations
 *   GPTBot         — collects data that may be used for model training
 *   ChatGPT-User   — fetches a page because a user asked for it right then
 *
 * Blocking one does not block the others, and blocking GPTBot does not remove
 * the site from ChatGPT Search. Naming them separately keeps that choice
 * visible: to opt out of training only, change GPTBot's `allow` to `disallow`
 * and leave the rest alone.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/" },
            { userAgent: "OAI-SearchBot", allow: "/" },
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
