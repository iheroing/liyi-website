#!/usr/bin/env node

import http from "node:http";
import https from "node:https";
import tls from "node:tls";

const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY_MS = 5_000;
const REQUEST_TIMEOUT_MS = 20_000;

const retries = readNonNegativeInteger(
  process.env.PRODUCTION_CHECK_RETRIES,
  DEFAULT_RETRIES,
);
const retryDelayMs = readNonNegativeInteger(
  process.env.PRODUCTION_CHECK_RETRY_DELAY_MS,
  DEFAULT_RETRY_DELAY_MS,
);

const pageChecks = [
  {
    name: "申论素材库",
    url: "https://www.liyi.online/shenlun",
    // Stable page identity, not editorial copy: wording changes should not
    // mark a still-serving migration page as down before deployment finishes.
    markers: ["申论素材库已迁移", "https://huatu.feishu.cn/base/LloMbOivlaqSVDsPjUecLagJnsc"],
    minBytes: 1_000,
  },
  {
    name: "国考岗位智能推荐",
    url: "https://www.liyi.online/guokao",
    markers: ["国考岗位智能推荐"],
    minBytes: 300,
  },
  {
    name: "诗骰",
    url: "https://www.liyi.online/poetry-dice",
    markers: ["诗骰", "掷出词面"],
    minBytes: 300,
  },
  {
    name: "AI 培训师",
    url: "https://www.liyi.online/ai-trainer",
    markers: ["华图AI培训师"],
    minBytes: 300,
  },
  {
    name: "雪花密语",
    url: "https://www.liyi.online/snowflake",
    markers: ["雪花密语", "Snowflake Whisper"],
    minBytes: 1_000,
  },
  {
    name: "原子笔记",
    url: "https://www.liyi.online/atomizer",
    markers: ["原子笔记", "Knowledge Atomizer"],
    minBytes: 1_000,
  },
];

async function main() {
  console.log(`Starting production checks at ${new Date().toISOString()}`);

  const checks = [
    ...pageChecks.map((check) => () => checkPage(check)),
  ];

  const results = await Promise.allSettled(checks.map((check) => check()));
  const failures = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason);

  if (failures.length > 0) {
    console.error(`\n${failures.length} production check(s) failed:`);
    for (const failure of failures) {
      console.error(`- ${formatError(failure)}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("\nAll production checks passed.");
}

async function checkPage({ name, url, markers, minBytes }) {
  return withRetry(name, async () => {
    const response = await get(url);
    assertOk(response, url);

    const body = await response.text();
    const bytes = Buffer.byteLength(body);
    if (bytes < minBytes) {
      throw new Error(`${url} returned only ${bytes} bytes (expected at least ${minBytes})`);
    }

    const missingMarkers = markers.filter((marker) => !body.includes(marker));
    if (missingMarkers.length > 0) {
      throw new Error(`${url} is missing content marker(s): ${missingMarkers.join(", ")}`);
    }

    console.log(`PASS ${name}: HTTP ${response.status}, ${bytes} bytes`);
  });
}

async function get(url, headers = {}) {
  const proxyUrl = process.env.HTTPS_PROXY ?? process.env.https_proxy;
  if (proxyUrl && new URL(proxyUrl).protocol === "http:") {
    return getThroughHttpProxy(url, proxyUrl, headers);
  }

  return fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
      "user-agent": "liyi-production-health/1.0",
      ...headers,
    },
    redirect: "follow",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

function getThroughHttpProxy(url, proxyUrl, headers) {
  const target = new URL(url);
  const proxy = new URL(proxyUrl);
  const agent = new https.Agent({ keepAlive: false });

  agent.createConnection = (_options, callback) => {
    const tunnel = http.request({
      hostname: proxy.hostname,
      port: proxy.port || 80,
      method: "CONNECT",
      path: `${target.hostname}:${target.port || 443}`,
      headers: { host: `${target.hostname}:${target.port || 443}` },
    });

    tunnel.once("connect", (response, socket) => {
      if (response.statusCode !== 200) {
        socket.destroy();
        callback(new Error(`proxy CONNECT returned HTTP ${response.statusCode}`));
        return;
      }

      const secureSocket = tls.connect({ socket, servername: target.hostname });
      secureSocket.once("secureConnect", () => callback(null, secureSocket));
      secureSocket.once("error", callback);
    });
    tunnel.once("error", callback);
    tunnel.setTimeout(REQUEST_TIMEOUT_MS, () =>
      tunnel.destroy(new Error(`proxy CONNECT timed out after ${REQUEST_TIMEOUT_MS}ms`)),
    );
    tunnel.end();
  };

  return new Promise((resolve, reject) => {
    const request = https.request(
      target,
      {
        agent,
        headers: {
          accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
          "accept-encoding": "identity",
          "user-agent": "liyi-production-health/1.0",
          ...headers,
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.once("end", () => {
          const body = Buffer.concat(chunks);
          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            text: async () => body.toString("utf8"),
            json: async () => JSON.parse(body.toString("utf8")),
          });
        });
      },
    );

    request.once("error", reject);
    request.setTimeout(REQUEST_TIMEOUT_MS, () =>
      request.destroy(new Error(`request timed out after ${REQUEST_TIMEOUT_MS}ms`)),
    );
    request.end();
  });
}

function assertOk(response, url) {
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
}

async function withRetry(name, check) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      await check();
      return;
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;

      const delay = retryDelayMs * (attempt + 1);
      console.warn(
        `RETRY ${name}: ${formatError(error)}; trying again in ${delay}ms (${attempt + 1}/${retries})`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`${name}: ${formatError(lastError)}`);
}

function readNonNegativeInteger(value, fallback) {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}

await main();
