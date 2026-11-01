import CaseSection from "@/components/case-section";
import Chips from "@/components/chips";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import Seo from "@/components/seo";
import Status from "@/components/status";
import {
  caseStudies,
  projectBySlug,
  projectsFor,
  type Project,
} from "@/content/projects";
import { PROFILE_LABELS, PROFILE_PATHS } from "@/content/site";
import { breadcrumbSchema, projectSchema } from "@/lib/structured-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

export default function CaseStudy({ slug }: { slug: string }) {
  const project = projectBySlug(slug) as Project;
  const cs = project.caseStudy!;
  const profilePath = PROFILE_PATHS[project.profile];
  const profileLabel = PROFILE_LABELS[project.profile];
  const path = `/projects/${project.slug}`;

  const siblings = projectsFor(project.profile).filter((p) => p.caseStudy);
  const idx = siblings.findIndex((p) => p.slug === project.slug);
  const next = siblings[(idx + 1) % siblings.length];

  return (
    <>
      <Seo
        title={cs.title}
        description={cs.description}
        path={path}
        type="article"
        image={`/og/${project.profile}.png`}
        jsonLd={[
          { "@context": "https://schema.org", ...projectSchema(project) },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: profileLabel, path: profilePath },
            { name: project.name, path },
          ]),
        ]}
      />
      <article className="mx-auto max-w-prose px-5 pb-8 pt-14 sm:px-0 sm:pt-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-subtle">
            <li>
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`${profilePath}#projects`} className="hover:text-fg">
                {profileLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-muted">
              {project.name}
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label">{project.kind}</span>
            <span aria-hidden className="text-line-strong">
              ·
            </span>
            <Status {...project.status} />
            <span aria-hidden className="text-line-strong">
              ·
            </span>
            <span className="font-mono text-[12px] text-subtle">
              {project.period}
            </span>
          </div>
          <h1 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[40px]">
            {project.name}
          </h1>
          <p className="mt-4 text-[18px] leading-[1.65] text-body">
            {project.summary}
          </p>

          <dl className="mt-8 grid gap-5 border-y border-line py-6 text-[14px] sm:grid-cols-2">
            <div>
              <dt className="label">My part</dt>
              <dd className="mt-1.5 leading-6 text-muted">{project.role}</dd>
            </div>
            <div>
              <dt className="label">Links</dt>
              <dd className="mt-1.5">
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="inline-flex items-center gap-1 text-fg hover:text-accent"
                      >
                        {l.label}
                        <ArrowUpRight className="text-subtle" />
                      </a>
                    </li>
                  ))}
                  {project.post && (
                    <li>
                      <Link
                        href={project.post.href}
                        className="text-fg hover:text-accent"
                      >
                        Write-up
                      </Link>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="label">Stack</dt>
              <dd className="mt-2">
                <Chips
                  items={project.stack}
                  label={`Technologies used in ${project.name}`}
                />
              </dd>
            </div>
          </dl>
        </header>

        {project.image && (
          <figure className="mt-10 sm:-mx-16">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 860px) 800px, 100vw"
              priority
              className="h-auto w-full rounded-lg border border-line"
            />
          </figure>
        )}

        <div className="mt-12">
          {cs.sections.map((s) => (
            <CaseSection key={s.heading} section={s} />
          ))}
        </div>

        {project.post && (
          <p className="mt-12 rounded-lg border border-line p-5 text-[15px] leading-7 text-body">
            I also wrote about this project in a less structured way:{" "}
            <Link className="link" href={project.post.href}>
              {project.post.title}
            </Link>
            .
          </p>
        )}

        <nav
          aria-label="More projects"
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px]"
        >
          <Link
            href={`${profilePath}#projects`}
            className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
          >
            <ArrowLeft />
            All {project.profile === "ai" ? "AI and ML" : "software"} projects
          </Link>
          {next && next.slug !== project.slug && (
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-1.5 font-medium text-fg"
            >
              Next: {next.name}
              <ArrowRight className="text-accent transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudies().map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const project = projectBySlug(slug);
  if (!project?.caseStudy) return { notFound: true };
  return { props: { slug, profile: project.profile } };
};
