import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { PROJECTS_DATA } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MdPreview } from "react-icons/md";
import { SiGithub } from "react-icons/si";

type ProjectCardProps = (typeof PROJECTS_DATA)[number];

const ProjectCard: FC<ProjectCardProps> = ({
  deployedLink,
  githubLink,
  shortDescription,
  title,
  imageSrc,
  techStack,
}) => {
  return (
    <SlideUpWhenVisible>
      <div
        className="glow-card group flex flex-col overflow-hidden h-full"
        style={{ borderRadius: "4px" }}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", background: "var(--surface-2)" }}
        >
          <Image
            src={imageSrc}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={title}
            width={600}
            height={338}
            style={{ filter: "grayscale(15%) contrast(1.05)" }}
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(212,168,83,0.06)" }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow" style={{ background: "var(--surface)" }}>
          <div className="flex justify-between items-start mb-3">
            <h3
              className="font-mono text-sm font-medium tracking-wide"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2.5" style={{ color: "var(--text-3)" }}>
              {githubLink && (
                <Link href={githubLink} target="_blank">
                  <SiGithub
                    className="w-4 h-4 transition-colors duration-200"
                    style={{ color: "var(--text-3)" }}
                    onMouseEnter={(e) => ((e.currentTarget as SVGElement).style.color = "var(--amber)")}
                    onMouseLeave={(e) => ((e.currentTarget as SVGElement).style.color = "var(--text-3)")}
                  />
                </Link>
              )}
              {deployedLink && (
                <Link href={deployedLink} target="_blank">
                  <MdPreview
                    className="w-5 h-5 transition-colors duration-200"
                    style={{ color: "var(--text-3)" }}
                    onMouseEnter={(e) => ((e.currentTarget as SVGElement).style.color = "var(--amber)")}
                    onMouseLeave={(e) => ((e.currentTarget as SVGElement).style.color = "var(--text-3)")}
                  />
                </Link>
              )}
            </div>
          </div>

          <p
            className="text-xs leading-relaxed flex-grow mb-4"
            style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}
          >
            {shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {techStack?.slice(0, 4).map((stack) => (
              <span key={stack.title} className="tag-pill">
                {stack.title}
              </span>
            ))}
            {techStack && techStack.length > 4 && (
              <span className="tag-pill">+{techStack.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </SlideUpWhenVisible>
  );
};

export default ProjectCard;
