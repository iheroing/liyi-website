import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/poetry-dice/:path*",
        destination: "https://poetry-dice.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
