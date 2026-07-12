import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  const pageSource = await readProjectFile("src/app/shenlun/page.tsx");

  assert.match(
    pageSource,
    /https:\/\/shenlun-materials-2026\.infinity88-2025\.chatgpt\.site\/api\/materials(?:\?[^"']*)?/,
  );
});
