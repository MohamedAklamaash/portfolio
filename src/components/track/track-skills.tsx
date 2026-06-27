import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { skillsForTrack, TRACKS, type TrackId } from "@/lib/tracks";
import { NextSeo } from "next-seo";
import {
  BrainCircuitIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  LayoutIcon,
  ServerIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "AI / ML Research": BrainCircuitIcon,
  "Applied AI": SparklesIcon,
  Languages: CodeIcon,
  "Backend & Frameworks": ServerIcon,
  "Frontend & Mobile": LayoutIcon,
  Databases: DatabaseIcon,
  "Cloud & DevOps": CloudIcon,
};

const TrackSkills = ({ track }: { track: TrackId }) => {
  const cfg = TRACKS[track];
  const categories = skillsForTrack(track);

  return (
    <>
      <NextSeo
        title={`Skills — ${cfg.label}`}
        description={`${cfg.label} toolkit of Mohamed Aklamaash.`}
        canonical={`https://aklamaash.me/${track}/skills`}
      />
      <div className="min-h-screen pt-12 pb-28 px-6 lg:px-16" style={{ background: "var(--bg)" }}>
        <SlideUpWhenVisible>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                {cfg.label} · Toolkit
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1 className="font-display leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}>
              Skills
            </h1>
            <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-3)" }}>
              {track === "ai-ml" ? "What I reach for in research & ML work." : "What I reach for in backend & infra work."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto columns-1 md:columns-2 gap-8 [&>*]:mb-8 [&>*]:break-inside-avoid">
            {categories.map((category, i) => {
              const Icon = CATEGORY_ICONS[category.title] ?? CodeIcon;
              return (
                <div key={category.title} className="p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="flex items-center justify-center w-7 h-7 shrink-0"
                      style={{ color: "var(--amber)", border: "1px solid var(--amber-dim)", borderRadius: "3px", background: "var(--amber-glow)" }}
                    >
                      <Icon size={14} />
                    </span>
                    <span className="font-mono text-xs tracking-[0.15em]" style={{ color: "var(--text-3)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-mono text-sm font-medium" style={{ color: "var(--text)" }}>
                      {category.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill.title} className="tag-pill" style={{ "--color": skill.color } as React.CSSProperties}>
                        {skill.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SlideUpWhenVisible>
      </div>
    </>
  );
};

export default TrackSkills;
