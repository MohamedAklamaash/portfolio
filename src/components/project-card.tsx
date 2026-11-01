import type { Project } from "@/content/projects";
import Image from "next/image";
import Link from "next/link";
import Chips from "./chips";
import { ArrowRight, ArrowUpRight } from "./icons";
import Status from "./status";

const Links = ({ project }: { project: Project }) => (
  <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px]">
    {project.caseStudy && (
      <li>
        <Link
          href={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-1.5 font-medium text-fg"
        >
          Read the case study
          <span className="sr-only"> for {project.name}</span>
          <ArrowRight className="text-accent transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </li>
    )}
    {project.links.map((l) => (
      <li key={l.href}>
        <a
          href={l.href}
          className="inline-flex items-center gap-1 text-muted hover:text-fg"
        >
          {l.label}
          <span className="sr-only"> for {project.name}</span>
          <ArrowUpRight />
        </a>
      </li>
    ))}
    {project.post && (
      <li>
        <Link
          href={project.post.href}
          className="inline-flex items-center gap-1 text-muted hover:text-fg"
        >
          Write-up
          <span className="sr-only">: {project.post.title}</span>
        </Link>
      </li>
    )}
  </ul>
);

const Meta = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
    <span className="label">{project.kind}</span>
    <span aria-hidden className="text-line-strong">
      ·
    </span>
    <Status {...project.status} />
    <span aria-hidden className="text-line-strong">
      ·
    </span>
    <span className="font-mono text-[12px] text-subtle">{project.period}</span>
  </div>
);

/** Full project entry used on the profile pages. */
export const ProjectCard = ({ project }: { project: Project }) => {
  if (project.compact) return <ProjectCompact project={project} />;
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="card overflow-hidden"
    >
      {project.image && (
        <div className="border-b border-line bg-surface-2">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="h-auto w-full"
          />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <Meta project={project} />
        <h3
          id={`p-${project.slug}`}
          className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-fg"
        >
          {project.name}
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-body">
          {project.summary}
        </p>

        <dl className="mt-5 grid gap-4 text-[14px] leading-6 sm:grid-cols-2">
          <div>
            <dt className="label">What was interesting</dt>
            <dd className="mt-1.5 text-muted">{project.interesting}</dd>
          </div>
          <div>
            <dt className="label">My part</dt>
            <dd className="mt-1.5 text-muted">{project.role}</dd>
          </div>
        </dl>

        {project.figures && (
          <ul className="mt-5 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {project.figures.map((f) => (
              <li key={f.label} className="bg-surface px-4 py-3">
                <p className="font-mono text-[15px] text-fg">{f.value}</p>
                <p className="mt-0.5 text-[13px] leading-5 text-subtle">
                  {f.label}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <Chips
            items={project.stack}
            label={`Technologies used in ${project.name}`}
          />
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
};

/** Shorter entry for smaller projects. */
export const ProjectCompact = ({ project }: { project: Project }) => (
  <article
    aria-labelledby={`p-${project.slug}`}
    className="rounded-lg border border-line p-5 sm:p-6"
  >
    <Meta project={project} />
    <h3
      id={`p-${project.slug}`}
      className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-fg"
    >
      {project.name}
    </h3>
    <p className="mt-2 text-[15px] leading-7 text-body">{project.summary}</p>
    <p className="mt-2 text-[14px] leading-6 text-muted">
      {project.interesting}
    </p>
    <div className="mt-4">
      <Chips
        items={project.stack}
        label={`Technologies used in ${project.name}`}
      />
    </div>
    <div className="mt-4">
      <Links project={project} />
    </div>
  </article>
);
