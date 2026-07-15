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

test("only the custom site icon is present", async () => {
  await assert.doesNotReject(access(new URL("src/app/icon.png", projectRoot)));
  await assert.rejects(access(new URL("src/app/favicon.ico", projectRoot)));
});
