import { ArrowLeft } from "@/components/icons";
import Seo from "@/components/seo";
import { formatDate } from "@/lib/format";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { allContents } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    html: string;
  };
}

export default function Post({ post }: Props) {
  const path = `/posts/${post.slug}`;
  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={path}
        type="article"
        publishedTime={post.date}
        jsonLd={[
          articleSchema({
            title: post.title,
            description: post.description,
            path,
            date: post.date,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/posts" },
            { name: post.title, path },
          ]),
        ]}
      />
      <article className="mx-auto max-w-prose px-5 pt-14 sm:px-0 sm:pt-20">
        <nav aria-label="Breadcrumb">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-fg"
          >
            <ArrowLeft />
            Writing
          </Link>
        </nav>
        <header className="mt-8 border-b border-line pb-8">
          <time
            dateTime={post.date}
            className="font-mono text-[12px] text-subtle"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-[-0.025em] text-fg sm:text-[38px]">
            {post.title}
          </h1>
          <p className="mt-3 text-[17px] leading-7 text-muted">
            {post.description}
          </p>
        </header>
        {/* Built from the repo's own Markdown at build time, not user input. */}
        <div
          className="prose-post mt-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <footer className="mt-14 border-t border-line pt-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-fg"
          >
            <ArrowLeft />
            All writing
          </Link>
        </footer>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: allContents.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const doc = allContents.find((p) => p.slug === params?.slug);
  if (!doc) return { notFound: true };
  return {
    props: {
      post: {
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
        date: doc.date,
        html: doc.body.html,
      },
    },
  };
};
