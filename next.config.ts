import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
