import ProjectCard from "@/components/project/project-card";
import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { PROJECTS_DATA } from "@/lib/projects";
import { SearchIcon } from "lucide-react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

const TRACK_GROUPS: { key: "research" | "software"; label: string }[] = [
  { key: "research", label: "AI / ML" },
  { key: "software", label: "Software" },
];

const Projects = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState(PROJECTS_DATA);

  useEffect(() => {
    if (query.trim().length > 0) {
      setProjects(PROJECTS_DATA.filter((item) =>
        item.title.toUpperCase().includes(query.toUpperCase())
      ));
    } else {
      setProjects(PROJECTS_DATA);
    }
  }, [query]);

  return (
    <>
      <NextSeo title="Projects" description="A collection of projects that I've worked on." />
      <div
        className="min-h-screen pt-12 pb-28 px-6 lg:px-16"
        style={{ background: "var(--bg)" }}
      >
        <SlideUpWhenVisible>
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                Work
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h1
              className="font-display leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}
            >
              Projects
            </h1>
            <p className="font-mono text-sm mb-8" style={{ color: "var(--text-3)" }}>
              Collection of cool stuff I&apos;ve built.
            </p>

            {/* Search */}
            <div className="relative max-w-sm">
              <SearchIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-3)" }}
              />
              <input
                type="search"
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 font-mono text-sm outline-none transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-2)",
                  borderRadius: "2px",
                  color: "var(--text)",
                }}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--amber-dim)")}
                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--border-2)")}
              />
            </div>
          </div>
        </SlideUpWhenVisible>

        <div className="max-w-5xl mx-auto space-y-16">
          {projects.length > 0 ? (
            TRACK_GROUPS.map(({ key, label }) => {
              const items = projects.filter((p) => p.track === key);
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  {/* Track label */}
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="font-mono text-xs tracking-[0.2em] uppercase"
                      style={{ color: "var(--text-2)" }}
                    >
                      {label}
                    </span>
                    <span className="h-px flex-1" style={{ background: "var(--border)" }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((project) => (
                      <ProjectCard
                        key={project.title}
                        shortDescription={project.shortDescription}
                        isFeatured={project.isFeatured}
                        title={project.title}
                        description={project.description}
                        imageSrc={project.imageSrc}
                        deployedLink={project.deployedLink}
                        githubLink={project.githubLink}
                        techStack={project.techStack}
                        track={project.track}
                        metric={project.metric}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>
              No projects matching &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
