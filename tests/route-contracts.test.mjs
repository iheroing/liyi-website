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

test("shenlun page remains connected to the materials backend", async () => {
  const [pageSource, clientSource] = await Promise.all([
    readProjectFile("src/app/shenlun/page.tsx"),
    readProjectFile("src/app/shenlun/shenlun-client.tsx"),
  ]);

  assert.match(
    pageSource,
    /https:\/\/shenlun-materials-2026\.infinity88-2025\.chatgpt\.site\/api\/materials(?:\?[^"']*)?/,
  );
  assert.match(pageSource, /MATERIALS_CLIENT_URL = "\/shenlun-api\/materials/);
  assert.match(pageSource, /view=summary/);
  assert.match(pageSource, /export const revalidate = 300/);
  assert.match(pageSource, /initialData=\{initialData\}/);
  assert.match(clientSource, /endpoint\.pathname.*item\.id/);
  assert.match(clientSource, /detailState === "loading"/);
  assert.match(clientSource, /aria-busy="true"/);
  assert.match(clientSource, /正在装订全文与精读标注/);
  assert.match(clientSource, /AnimatePresence initial=\{false\}/);
  assert.match(clientSource, /hasInitialData/);
  assert.match(clientSource, /hasInitialData\.current \? 60_000 : 0/);
  assert.match(clientSource, /篇待补全文/);
  assert.match(clientSource, /篇待补精读/);
  assert.doesNotMatch(clientSource, /paragraphs\.slice\(0,\s*12\)/);
  assert.match(clientSource, /2xl:grid-cols-\[240px_minmax\(0,800px\)_340px\]/);
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

test("only the custom site icon is present", async () => {
  await assert.doesNotReject(access(new URL("src/app/icon.png", projectRoot)));
  await assert.rejects(access(new URL("src/app/favicon.ico", projectRoot)));
});
