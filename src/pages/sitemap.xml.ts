import { caseStudies } from "@/content/projects";
import { absoluteUrl } from "@/content/site";
import { allContents } from "contentlayer/generated";
import type { GetServerSideProps } from "next";

/** Only canonical, indexable URLs. Redirecting routes are left out on purpose. */
const buildSitemap = () => {
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: "/" },
    { loc: "/software" },
    { loc: "/ai" },
    ...caseStudies().map((p) => ({ loc: `/projects/${p.slug}` })),
    { loc: "/posts" },
    ...allContents.map((p) => ({ loc: `/posts/${p.slug}`, lastmod: p.date })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${absoluteUrl(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800",
  );
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
