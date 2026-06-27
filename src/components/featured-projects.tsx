import ProjectCard from "@/components/project/project-card";
import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { featuredForTrack, type TrackId } from "@/lib/tracks";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const FeaturedProjects = ({ track }: { track: TrackId }) => {
  const projects = featuredForTrack(track);
  const allHref = `/${track}/projects`;

  return (
    <div className="py-24 px-6 lg:px-8 max-w-5xl mx-auto">
      <SlideUpWhenVisible>
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                Selected Work
              </span>
              <span className="h-px w-12" style={{ background: "var(--border)" }} />
            </div>
            <h2
              className="font-display leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
            >
              Featured <br className="md:hidden" />
              <span style={{ color: "var(--amber)", fontStyle: "italic" }}>Projects</span>
            </h2>
          </div>
          <Link
            href={allHref}
            className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wide group transition-colors duration-200"
            style={{ color: "var(--text-3)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)")}
          >
            View All
            <ArrowRightIcon size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
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
              label={project.label}
            />
          ))}
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Link
            href={allHref}
            className="flex items-center gap-2 font-mono text-xs tracking-wide px-5 py-2.5 transition-all duration-200"
            style={{
              color: "var(--text-2)",
              border: "1px solid var(--border-2)",
              borderRadius: "2px",
            }}
          >
            View All Projects
            <ArrowRightIcon size={12} />
          </Link>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default FeaturedProjects;
