import { PERSON, PROFILE_LABELS, PROFILE_PATHS, RESUMES } from "@/content/site";
import Link from "next/link";

const Footer = () => (
  <footer className="mt-24 border-t border-line">
    <div className="mx-auto grid max-w-page gap-10 px-5 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-8">
      <div>
        <p className="text-[15px] font-medium text-fg">{PERSON.name}</p>
        <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">
          Software engineer from India. Backend, infrastructure, machine
          learning and AI.
        </p>
        <p className="mt-4 text-[14px]">
          <a className="link" href={`mailto:${PERSON.email}`}>
            {PERSON.email}
          </a>
        </p>
      </div>
      <nav aria-label="Profiles">
        <p className="label">Profiles</p>
        <ul className="mt-3 space-y-2 text-[14px]">
          <li>
            <Link
              className="text-muted hover:text-fg"
              href={PROFILE_PATHS.software}
            >
              {PROFILE_LABELS.software}
            </Link>
          </li>
          <li>
            <Link className="text-muted hover:text-fg" href={PROFILE_PATHS.ai}>
              {PROFILE_LABELS.ai}
            </Link>
          </li>
          <li>
            <Link className="text-muted hover:text-fg" href="/posts">
              Writing
            </Link>
          </li>
        </ul>
      </nav>
      <nav aria-label="Elsewhere">
        <p className="label">Elsewhere</p>
        <ul className="mt-3 space-y-2 text-[14px]">
          <li>
            <a className="text-muted hover:text-fg" href={PERSON.github}>
              GitHub
            </a>
          </li>
          <li>
            <a className="text-muted hover:text-fg" href={PERSON.linkedin}>
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="text-muted hover:text-fg"
              href={RESUMES.software.href}
            >
              Resume (Software, PDF)
            </a>
          </li>
          <li>
            <a className="text-muted hover:text-fg" href={RESUMES.ai.href}>
              Resume (AI and ML, PDF)
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div className="mx-auto max-w-page px-5 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-5 text-[13px] text-subtle">
        <p>
          © {new Date().getFullYear()} {PERSON.name}
        </p>
        <p className="flex gap-4">
          <Link className="hover:text-fg" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-fg" href="/terms">
            Terms
          </Link>
          <a className="hover:text-fg" href={`${PERSON.github}/portfolio`}>
            Source
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
