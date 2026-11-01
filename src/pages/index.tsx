import Contact from "@/components/contact";
import { ArrowRight, ArrowUpRight, FileIcon } from "@/components/icons";
import Section from "@/components/section";
import Seo from "@/components/seo";
import { EXPERIENCE } from "@/content/experience";
import { HOME } from "@/content/profiles";
import { PERSON, PROFILE_PATHS, RESUMES, type ProfileId } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getPostList, type PostMeta } from "@/lib/posts";
import { homeGraph } from "@/lib/structured-data";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

const PATH_ORDER: ProfileId[] = ["software", "ai"];

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Seo
        title={HOME.seo.title}
        description={HOME.seo.description}
        path="/"
        rawTitle
        type="profile"
        jsonLd={[homeGraph()]}
      />
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <header className="pb-14 pt-14 sm:pb-20 sm:pt-20">
          <Image
            src={PERSON.image}
            alt="Photo of Mohamed Aklamaash"
            width={72}
            height={72}
            priority
            sizes="72px"
            className="h-[72px] w-[72px] rounded-full border border-line-strong object-cover"
          />
          <h1 className="mt-7 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-[46px]">
            {HOME.greeting}
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            <span className="sr-only">Mohamed Aklamaash, </span>Software
            engineer · Coimbatore, India
          </p>
          <div className="mt-8 max-w-prose space-y-4 text-[17px] leading-[1.7] text-body">
            {HOME.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </header>

        <nav aria-label="Profiles" className="grid gap-4 sm:grid-cols-2">
          {PATH_ORDER.map((id) => {
            const card = HOME.paths[id];
            return (
              <Link
                key={id}
                href={PROFILE_PATHS[id]}
                className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-strong hover:bg-surface-2 sm:p-6"
              >
                <div>
                  <p className="label">{PROFILE_PATHS[id]}</p>
                  <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-fg">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-7 text-body">
                    {card.description}
                  </p>
                  <p className="mt-3 text-[14px] text-muted">
                    Including {card.examples}.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-fg">
                  View profile
                  <ArrowRight className="text-accent transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          <Section id="now" title="Right now">
            <dl className="divide-y divide-line rounded-lg border border-line">
              {HOME.now.map((n) => (
                <div
                  key={n.label}
                  className="grid gap-1 px-4 py-3.5 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:px-5"
                >
                  <dt className="text-[14px] text-subtle">{n.label}</dt>
                  <dd className="text-[15px] leading-7 text-body">
                    {n.text}
                    {n.href && (
                      <>
                        {" "}
                        <a
                          href={n.href}
                          className="link inline-flex items-center gap-1"
                        >
                          {n.href.replace("https://", "")}
                          <ArrowUpRight className="text-subtle" />
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="experience" title="Experience">
            {EXPERIENCE.map((job) => (
              <div key={job.company}>
                <h3 className="text-[17px] font-semibold text-fg">
                  {job.company}{" "}
                  <span className="ml-1 font-mono text-[12px] font-normal text-subtle">
                    {job.note}
                  </span>
                </h3>
                <p className="mt-2 max-w-prose text-[15px] leading-7 text-body">
                  {job.summary}
                </p>
                <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
                  {job.roles.map((r) => (
                    <li
                      key={r.start}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-5"
                    >
                      <span className="text-[15px] text-fg">{r.title}</span>
                      <span className="font-mono text-[12px] text-subtle">
                        {r.dates}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px] text-muted">
                  Details on the{" "}
                  <Link className="link" href="/software#experience">
                    software
                  </Link>{" "}
                  and{" "}
                  <Link className="link" href="/ai#experience">
                    AI
                  </Link>{" "}
                  profiles.
                </p>
              </div>
            ))}
          </Section>

          <Section
            id="writing"
            title="Writing"
            intro="Longer notes on why I built some of these projects."
          >
            <ul className="divide-y divide-line rounded-lg border border-line">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/posts/${p.slug}`}
                    className="group block px-4 py-4 transition-colors duration-150 hover:bg-surface sm:px-5"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[15px] font-medium text-fg">
                        {p.title}
                      </span>
                      <time
                        dateTime={p.date}
                        className="font-mono text-[12px] text-subtle"
                      >
                        {formatDate(p.date)}
                      </time>
                    </span>
                    <span className="mt-1 block text-[14px] leading-6 text-muted">
                      {p.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="resume"
            title="Resume"
            intro="Two versions, one for each kind of role. The experience is the same; the projects and emphasis differ."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {PATH_ORDER.map((id) => (
                <a
                  key={id}
                  href={RESUMES[id].href}
                  className="flex items-center gap-3 rounded-lg border border-line px-4 py-3.5 text-[15px] text-fg transition-colors duration-150 hover:border-line-strong hover:bg-surface"
                >
                  <FileIcon className="text-subtle" />
                  {RESUMES[id].label}
                  <span className="ml-auto font-mono text-[12px] text-subtle">
                    PDF
                  </span>
                </a>
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <Contact hideResumes />
          </Section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { posts: getPostList() },
});
