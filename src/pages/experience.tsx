import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/constants";
import { NextSeo } from "next-seo";

const Experience = () => {
  return (
    <>
      <NextSeo title="Experience" description="My professional experience and work history." />
      <div
        className="min-h-screen pt-12 pb-28 px-6 lg:px-16"
        style={{ background: "var(--bg)" }}
      >
        <SlideUpWhenVisible>
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                Career
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1
              className="font-display leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}
            >
              Experience
            </h1>
            <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-3)" }}>
              My professional journey and where I&apos;ve worked.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            {EXPERIENCE.map((job, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12"
                style={{ borderLeft: "1px solid var(--border-2)" }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--amber)", boxShadow: "0 0 10px var(--amber-glow-strong)" }}
                />

                {/* Company + role */}
                <div className="mb-3">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3
                      className="font-mono text-base font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {job.role}
                    </h3>
                    <span
                      className="font-mono text-xs px-2 py-0.5"
                      style={{
                        color: "var(--amber)",
                        background: "var(--amber-glow)",
                        border: "1px solid var(--amber-dim)",
                        borderRadius: "2px",
                      }}
                    >
                      {job.company}
                    </span>
                  </div>
                  <time className="font-mono text-xs" style={{ color: "var(--text-3)" }}>
                    {job.duration}
                  </time>
                </div>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}
                >
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span key={tech} className="tag-pill">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SlideUpWhenVisible>
      </div>
    </>
  );
};

export default Experience;
