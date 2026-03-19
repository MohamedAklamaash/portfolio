import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { SKILL_CATEGORIES } from "@/lib/skill-categories";
import { NextSeo } from "next-seo";

const Skills = () => {
  return (
    <>
      <NextSeo title="Skills" description="Technologies and tools I work with." />
      <div
        className="min-h-screen pt-12 pb-28 px-6 lg:px-16"
        style={{ background: "var(--bg)" }}
      >
        <SlideUpWhenVisible>
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                Toolkit
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1
              className="font-display leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}
            >
              Skills
            </h1>
            <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-3)" }}>
              My technical proficiency across different domains.
            </p>
          </div>

          {/* Grid */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((category, i) => (
              <div
                key={category.title}
                className="p-6"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-mono text-xs tracking-[0.15em] uppercase"
                    style={{ color: "var(--amber)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="font-mono text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {category.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.title}
                      className="tag-pill"
                      style={{ "--color": skill.color } as React.CSSProperties}
                    >
                      {skill.title}
                    </span>
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

export default Skills;
