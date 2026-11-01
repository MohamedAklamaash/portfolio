import Link from "next/link";
import type { ReactNode } from "react";
import Seo from "./seo";

interface LegalPageProps {
  title: string;
  path: string;
  updated: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}

const LegalPage = ({
  title,
  path,
  updated,
  intro,
  sections,
}: LegalPageProps) => (
  <>
    <Seo
      title={title}
      description={`${title} for aklamaash.me, a personal portfolio.`}
      path={path}
    />
    <article className="mx-auto max-w-prose px-5 pt-14 sm:px-0 sm:pt-20">
      <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-fg">
        {title}
      </h1>
      <p className="mt-2 text-[14px] text-subtle">Last updated: {updated}</p>
      <div className="mt-8 space-y-8 border-t border-line pt-8 text-[16px] leading-[1.75] text-body">
        <p>{intro}</p>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-[17px] font-semibold text-fg">{s.heading}</h2>
            <p className="mt-2">{s.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 border-t border-line pt-6 text-[14px]">
        <Link className="text-muted hover:text-fg" href="/">
          Back to home
        </Link>
      </p>
    </article>
  </>
);

export default LegalPage;
