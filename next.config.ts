import type { NextConfig } from "next";

// Canonical URLs, sitemap and Open Graph use NEXT_PUBLIC_SITE_URL. Without it they fall back to
// localhost, which must never be published — warn loudly on every production build.
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    [
      "",
      "⚠  NEXT_PUBLIC_SITE_URL is not set — canonical URLs and the sitemap will point to localhost.",
      "   Set it to the production domain before deploying (see .env.example).",
      "",
    ].join("\n"),
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake large animation / 3D packages to what is actually imported.
    optimizePackageImports: ["gsap", "@react-three/drei"],
  },
  async redirects() {
    // "Leadership" was renamed "Our Team" (IP-05).
    return [{ source: "/leadership", destination: "/team", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
