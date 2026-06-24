import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/poetry-dice",
        destination: "/poetry-dice/",
        permanent: true,
      },
    ];
  },
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
