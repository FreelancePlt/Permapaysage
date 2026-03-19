import type { NextConfig } from "next";

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Studio : autorise l'iframe depuis sanity.io (dashboard)
        source: "/studio/:path*",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.sanity.io",
          },
        ],
      },
      {
        // Tout le reste : bloque les iframes
        source: "/((?!studio).*)",
        headers: [
          ...baseHeaders,
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
