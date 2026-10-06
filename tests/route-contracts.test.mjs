import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function readProjectFile(path) {
  return readFile(new URL(path, projectRoot), "utf8");
}

function rewritePairs(configSource) {
  return [...configSource.matchAll(
    /\{\s*source:\s*["']([^"']+)["'],\s*destination:\s*["']([^"']+)["'],?\s*\}/g,
  )].map(([, source, destination]) => ({ source, destination }));
}

test("proxy route contracts remain configured", async () => {
  const configSource = await readProjectFile("next.config.ts");
  const rewrites = rewritePairs(configSource);

  assert.deepEqual(rewrites, [
    {
      source: "/shenlun-api/:path*",
      destination: "https://shenlun-materials-2026.infinity88-2025.chatgpt.site/api/:path*",
    },
    {
      source: "/poetry-dice",
      destination: "https://poetry-dice.vercel.app/poetry-dice",
    },
    {
      source: "/poetry-dice/:path*",
      destination: "https://poetry-dice.vercel.app/poetry-dice/:path*",
    },
    {
      source: "/guokao",
      destination: "https://guokao-job-advisor.vercel.app/guokao",
    },
    {
      source: "/guokao/:path*",
      destination: "https://guokao-job-advisor.vercel.app/guokao/:path*",
    },
    {
      source: "/ai-trainer",
      destination: "https://ai-trainer-report.vercel.app/ai-trainer/",
    },
    {
      source: "/ai-trainer/:path*",
      destination: "https://ai-trainer-report.vercel.app/ai-trainer/:path*",
    },
    {
      source: "/snowflake",
      destination: "https://snowflake-encryption-protocol.vercel.app/snowflake/",
    },
    {
      source: "/snowflake/:path*",
      destination: "https://snowflake-encryption-protocol.vercel.app/snowflake/:path*",
    },
    {
      source: "/atomizer",
      destination: "https://knowledge-atomizer-web.vercel.app/atomizer",
    },
    {
      source: "/atomizer/:path*",
      destination: "https://knowledge-atomizer-web.vercel.app/atomizer/:path*",
    },
  ]);
});

test("retired Shenlun reader is a static migration page independent of its old backend", async () => {
  const pageSource = await readProjectFile("src/app/shenlun/page.tsx");
  assert.match(pageSource, /申论素材库已搬到飞书/);
  assert.match(pageSource, /https:\/\/huatu\.feishu\.cn\/base\/LloMbOivlaqSVDsPjUecLagJnsc/);
  assert.match(pageSource, /登录飞书后查看 · 需访问权限/);
  assert.match(pageSource, /href="\/"/);
  assert.match(pageSource, /rel="noopener noreferrer"/);
  assert.doesNotMatch(pageSource, /fetch\(|ShenlunClient|shenlun-api|revalidate/);
  const data = await readProjectFile("src/lib/data.ts");
  assert.match(data, /已迁移至飞书多维表格/);
  const checker = await readProjectFile("scripts/check-production.mjs");
  assert.doesNotMatch(checker, /checkMaterialsApi|chatgpt\.site\/api\/materials/);
});

test("site language and Shenlun detail tabs remain accessible", async () => {
  const [layout, client] = await Promise.all([
    readProjectFile("src/app/layout.tsx"),
    readProjectFile("src/app/shenlun/shenlun-client.tsx"),
  ]);
  assert.match(layout, /<html lang="zh-CN"/);
  assert.match(client, /role="tablist"/);
  assert.match(client, /role="tabpanel"/);
  assert.match(client, /aria-selected=/);
});

test("homepage keeps the Guokao project introduction", async () => {
  const data = await readProjectFile("src/lib/data.ts");

  assert.match(data, /name:\s*["']国考岗位智能推荐["']/);
  assert.match(data, /url:\s*["']\/guokao["']/);
});

test("homepage keeps the AI trainer project introduction", async () => {
  const data = await readProjectFile("src/lib/data.ts");

  assert.match(data, /name:\s*["']AI 培训师["']/);
  assert.match(data, /url:\s*["']\/ai-trainer["']/);
});

test("homepage keeps the Snowflake Whisper project introduction", async () => {
  const data = await readProjectFile("src/lib/data.ts");

  assert.match(data, /name:\s*["']雪花密语["']/);
  assert.match(data, /url:\s*["']\/snowflake["']/);
});

test("homepage keeps the atomizer project introduction", async () => {
  const data = await readProjectFile("src/lib/data.ts");

  assert.match(data, /name:\s*["']原子笔记["']/);
  assert.match(data, /url:\s*["']\/atomizer["']/);
});

test("every mounted app is reachable from the homepage", async () => {
  const data = await readProjectFile("src/lib/data.ts");
  const config = await readProjectFile("next.config.ts");

  // Slugs mounted through rewrites, ignoring the :path* companions and the
  // API-only proxy.
  const mounted = new Set(
    rewritePairs(config)
      .map(({ source }) => source)
      .filter((source) => !source.includes(":path*") && !source.endsWith("-api")),
  );

  const listed = new Set(
    [...data.matchAll(/url:\s*["'](\/[^"']+)["']/g)].map(([, url]) => url),
  );

  for (const slug of mounted) {
    assert.ok(
      listed.has(slug),
      `${slug} is mounted but nothing on the homepage links to it`,
    );
  }
});

test("featured work only promotes things that actually shipped", async () => {
  const data = await readProjectFile("src/lib/data.ts");

  const featuredBlock = data.slice(
    data.indexOf("featured: ["),
    data.indexOf("method: ["),
  );
  assert.ok(featuredBlock.length > 0, "featured block not found in data.ts");

  const productsBlock = data.slice(
    data.indexOf("products: {"),
    data.indexOf("featured: ["),
  );

  for (const [, url] of featuredBlock.matchAll(/url:\s*["']([^"']+)["']/g)) {
    assert.ok(
      productsBlock.includes(`"${url}"`),
      `featured url ${url} is not present in products`,
    );
  }

  for (const [, group] of featuredBlock.matchAll(/collects:\s*\[([^\]]+)\]/g)) {
    for (const [, name] of group.matchAll(/["']([^"']+)["']/g)) {
      assert.ok(
        productsBlock.includes(`"${name}"`),
        `featured entry collects "${name}", which is not in products`,
      );
    }
  }
});

test("mounted apps do not inherit the personal-site chrome", async () => {
  const root = await readProjectFile("src/app/layout.tsx");
  const site = await readProjectFile("src/app/(site)/layout.tsx");

  // Header/Footer/SoundController in the root layout would render on top of
  // /shenlun and every future mounted app, stacking two navigations.
  for (const chrome of ["Header", "Footer", "SoundController"]) {
    assert.doesNotMatch(
      root,
      new RegExp(`<${chrome}\\s*/>`),
      `${chrome} belongs in src/app/(site)/layout.tsx, not the root layout`,
    );
    assert.match(site, new RegExp(`<${chrome}\\s*/>`));
  }

  // /shenlun must stay outside the (site) group.
  await assert.doesNotReject(access(new URL("src/app/shenlun/page.tsx", projectRoot)));
  await assert.rejects(access(new URL("src/app/(site)/shenlun", projectRoot)));
});

test("discovery files derive from the registry, not a hand-kept list", async () => {
  const sitemap = await readProjectFile("src/app/sitemap.ts");
  const robots = await readProjectFile("src/app/robots.ts");

  // A literal path here means the next mount silently goes missing from the
  // sitemap, which is exactly the drift the derived index avoids elsewhere.
  assert.match(sitemap, /PROFILE\.products\.apps/);
  assert.doesNotMatch(sitemap, /["']\/(?:shenlun|guokao|poetry-dice|snowflake|atomizer|ai-trainer)["']/);

  assert.match(robots, /sitemap:/);
  // The three OpenAI agents are separate controls; collapsing them into one
  // rule silently changes what is opted in or out of.
  for (const agent of ["OAI-SearchBot", "GPTBot", "ChatGPT-User"]) {
    assert.match(robots, new RegExp(agent));
  }
});

test("only the custom site icon is present", async () => {
  await assert.doesNotReject(access(new URL("src/app/icon.png", projectRoot)));
  await assert.rejects(access(new URL("src/app/favicon.ico", projectRoot)));
});
