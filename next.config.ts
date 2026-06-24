import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
