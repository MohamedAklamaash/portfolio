import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { experienceForTrack, TRACKS, type TrackId } from "@/lib/tracks";
import { NextSeo } from "next-seo";

const TrackExperience = ({ track }: { track: TrackId }) => {
  const cfg = TRACKS[track];
  const jobs = experienceForTrack(track);

  return (
    <>
      <NextSeo
        title={`Experience — ${cfg.label}`}
        description={`${cfg.label} experience of Mohamed Aklamaash.`}
        canonical={`https://aklamaash.me/${track}/experience`}
      />
      <div className="min-h-screen pt-12 pb-28 px-6 lg:px-16" style={{ background: "var(--bg)" }}>
        <SlideUpWhenVisible>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                {cfg.label} · Career
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1 className="font-display leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}>
              Experience
            </h1>
            <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-3)" }}>
              {track === "ai-ml" ? "Where I've shipped AI/ML work." : "Where I've shipped backend & infra work."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {jobs.map((job, index) => (
              <div key={index} className="relative pl-8 pb-12" style={{ borderLeft: "1px solid var(--border-2)" }}>
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: "var(--amber)", boxShadow: "0 0 10px var(--amber-glow-strong)" }} />

                <div className="mb-3">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-mono text-base font-medium" style={{ color: "var(--text)" }}>
                      {job.role}
                    </h3>
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs px-2 py-0.5 transition-all duration-200 hover:scale-[1.02]"
                        style={{ color: "var(--amber)", background: "var(--amber-glow)", border: "1px solid var(--amber-dim)", borderRadius: "2px" }}
                      >
                        {job.company}
                      </a>
                    ) : (
                      <span className="font-mono text-xs px-2 py-0.5" style={{ color: "var(--amber)", background: "var(--amber-glow)", border: "1px solid var(--amber-dim)", borderRadius: "2px" }}>
                        {job.company}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--text-3)" }}>
                    <time>{job.duration}</time>
                    {job.location && (
                      <>
                        <span className="h-1 w-1 rounded-full opacity-30" style={{ background: "currentColor" }} />
                        <span>{job.location}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="text-sm leading-relaxed mb-5 space-y-3 list-none" style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}>
                  {job.description.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--amber)", boxShadow: "0 0 8px var(--amber-glow-strong)" }} />
                      <span className="flex-1 opacity-90">{point.text}</span>
                    </li>
                  ))}
                </ul>

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

export default TrackExperience;
