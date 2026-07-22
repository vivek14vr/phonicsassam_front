import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/plans", destination: "/workshops", permanent: true },
      { source: "/plans/:slug", destination: "/workshops", permanent: true },
      { source: "/programs", destination: "/workshops", permanent: true },
      { source: "/programs/:slug", destination: "/workshops", permanent: true },
      { source: "/pricing", destination: "/workshops", permanent: true },
      { source: "/admin/programs", destination: "/admin/workshops", permanent: true },
      { source: "/district/:path*", destination: "/galleries", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "komalgoenka.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
