import type { Profile } from "@/content/profiles";
import {
  PROFILE_LABELS,
  PROFILE_PATHS,
  RESUMES,
  type ProfileId,
} from "@/content/site";
import Link from "next/link";
import { ArrowRight, FileIcon } from "./icons";

const ProfileHero = ({ profile }: { profile: Profile }) => {
  const other: ProfileId = profile.id === "software" ? "ai" : "software";
  return (
    <header className="pb-12 pt-14 sm:pb-16 sm:pt-20">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-[13px] text-subtle">
          <li>
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-muted">
            {PROFILE_LABELS[profile.id]}
          </li>
        </ol>
      </nav>
      <p className="label text-accent">{profile.eyebrow}</p>
      <h1 className="mt-4 max-w-[22ch] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[42px]">
        {profile.heading}
      </h1>
      <div className="mt-7 max-w-prose space-y-4 text-[17px] leading-[1.7] text-body">
        {profile.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="mt-6 max-w-prose text-[15px] text-muted">
        {profile.lookingFor}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={RESUMES[profile.id].href}
          className="inline-flex items-center gap-2 rounded-md bg-fg px-3.5 py-2 text-[14px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
        >
          <FileIcon />
          Resume (PDF)
        </a>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-md border border-line-strong px-3.5 py-2 text-[14px] font-medium text-fg transition-colors duration-150 hover:border-subtle"
        >
          Get in touch
        </Link>
        <Link
          href={PROFILE_PATHS[other]}
          className="group inline-flex items-center gap-1.5 px-1 py-2 text-[14px] text-muted hover:text-fg"
        >
          {PROFILE_LABELS[other]} profile
          <ArrowRight className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ul
        aria-label="Focus areas"
        className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[14px] text-muted"
      >
        {profile.focus.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-subtle" />
            {f}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default ProfileHero;
