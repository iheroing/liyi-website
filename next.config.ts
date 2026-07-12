import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
