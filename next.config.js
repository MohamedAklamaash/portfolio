const { withContentlayer } = require("next-contentlayer");

const isDev = process.env.NODE_ENV !== "production";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// 'unsafe-inline' is needed for Next's inline bootstrap and JSON-LD.
// 'unsafe-eval' is only needed by the dev server and the MDX post pages.
const csp = ({ allowEval }) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev || allowEval ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp({ allowEval: false }) },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const longCache = "public, max-age=31536000, immutable";
const dayCache = "public, max-age=86400, stale-while-revalidate=604800";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // MDX posts are compiled at build time but evaluated with new Function()
      // in the browser (mdx-bundler), so only post pages may use eval.
      {
        source: "/posts/:slug",
        headers: [
          { key: "Content-Security-Policy", value: csp({ allowEval: true }) },
        ],
      },
      {
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/projects/:file(.*\\.(?:png|jpg|webp|avif))",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/:file(.*\\.pdf)",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/:file(favicon\\.ico|favicon\\.svg|apple-touch-icon\\.png)",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
    ];
  },
  async redirects() {
    return [
      // The AI profile moved from /ai-ml to /ai.
      { source: "/ai-ml", destination: "/ai", permanent: true },
      {
        source: "/ai-ml/projects",
        destination: "/ai#projects",
        permanent: true,
      },
      {
        source: "/ai-ml/experience",
        destination: "/ai#experience",
        permanent: true,
      },
      { source: "/ai-ml/skills", destination: "/ai#skills", permanent: true },
      { source: "/ai-ml/:path*", destination: "/ai", permanent: true },
      // Track sub-pages were folded into a single profile page.
      {
        source: "/software/projects",
        destination: "/software#projects",
        permanent: true,
      },
      {
        source: "/software/experience",
        destination: "/software#experience",
        permanent: true,
      },
      {
        source: "/software/skills",
        destination: "/software#skills",
        permanent: true,
      },
      // Older top-level routes.
      {
        source: "/projects",
        destination: "/software#projects",
        permanent: true,
      },
      {
        source: "/experience",
        destination: "/software#experience",
        permanent: true,
      },
      { source: "/skills", destination: "/software#skills", permanent: true },
      // Unchanged from before.
      { source: "/resume", destination: "/resume.pdf", permanent: true },
      {
        source: "/college",
        destination: "https://www.psgtech.edu",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/MohamedAklamaash",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
