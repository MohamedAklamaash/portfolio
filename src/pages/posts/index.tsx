import PostCard from "@/components/post-card";
import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { allContents } from "contentlayer/generated";
import { NextSeo } from "next-seo";

const Posts = () => {
  return (
    <>
      <NextSeo title="Posts | Mohamed Aklamaash" description="A collection of my blog posts." />
      <div
        className="min-h-screen pt-12 pb-28 px-6 lg:px-16"
        style={{ background: "var(--bg)" }}
      >
        <SlideUpWhenVisible>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                Writing
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1
              className="font-display leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}
            >
              Posts
            </h1>
            <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>
              Thoughts on engineering, systems, and building things.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-3 grid-cols-1 sm:grid-cols-2">
            {allContents
              ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((post) => (
                <PostCard
                  slug={post.slug}
                  key={post.title}
                  title={post.title}
                  description={post.description}
                />
              ))}
          </div>
        </SlideUpWhenVisible>
      </div>
    </>
  );
};

export default Posts;
