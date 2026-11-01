import Seo from "@/components/seo";
import { formatDate } from "@/lib/format";
import { getPostList, type PostMeta } from "@/lib/posts";
import { breadcrumbSchema } from "@/lib/structured-data";
import type { GetStaticProps } from "next";
import Link from "next/link";

export default function Posts({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Seo
        title="Writing"
        description="Notes by Mohamed Aklamaash on why and how he built his projects: deployment platforms, Postgres replication, LLM safety benchmarks and more."
        path="/posts"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/posts" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-prose px-5 pt-14 sm:px-0 sm:pt-20">
        <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-fg sm:text-[40px]">
          Writing
        </h1>
        <p className="mt-3 text-[17px] leading-7 text-body">
          Longer notes on why I built some of my projects and what I ran into
          along the way.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/posts/${p.slug}`} className="group block py-5">
                <time
                  dateTime={p.date}
                  className="font-mono text-[12px] text-subtle"
                >
                  {formatDate(p.date)}
                </time>
                <h2 className="mt-1.5 text-[18px] font-medium tracking-[-0.01em] text-fg group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-1 text-[15px] leading-6 text-muted">
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { posts: getPostList() },
});
