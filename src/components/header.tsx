import {
  PROFILE_NAV_LABELS,
  PROFILE_PATHS,
  RESUMES,
  type ProfileId,
} from "@/content/site";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * `profile` comes from page props (case studies pass it). Profile pages are
 * recognised by path. Kept out of the content modules so the header doesn't
 * pull project data into every page's bundle.
 */
const Header = ({ profile: fromProps }: { profile?: ProfileId }) => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  const profile: ProfileId | null =
    path === "/software"
      ? "software"
      : path === "/ai"
        ? "ai"
        : (fromProps ?? null);

  const items: { label: string; href: string; active: boolean }[] = [
    {
      label: PROFILE_NAV_LABELS.software,
      href: PROFILE_PATHS.software,
      active: profile === "software",
    },
    {
      label: PROFILE_NAV_LABELS.ai,
      href: PROFILE_PATHS.ai,
      active: profile === "ai",
    },
    { label: "Writing", href: "/posts", active: path.startsWith("/posts") },
  ];

  const resume = profile ? RESUMES[profile] : null;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-3 px-5 max-[360px]:gap-2 max-[360px]:px-3 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded text-[15px] font-medium tracking-[-0.01em] text-fg"
          aria-current={path === "/" ? "page" : undefined}
        >
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-[5px] border border-line-strong bg-surface-2 font-mono text-[11px] font-semibold text-accent"
          >
            MA
          </span>
          <span className="hidden sm:inline">Mohamed Aklamaash</span>
          <span className="sr-only sm:hidden">Mohamed Aklamaash, home</span>
        </Link>

        <nav aria-label="Main" className="min-w-0">
          <ul className="flex items-center gap-0.5 text-[14px] sm:gap-1">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  aria-current={it.active ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-md px-2 py-1.5 transition-colors duration-150 max-[360px]:px-1.5 max-[360px]:text-[13px] sm:px-2.5",
                    it.active
                      ? "bg-surface-2 text-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              {resume ? (
                <a
                  href={resume.href}
                  className="block whitespace-nowrap rounded-md px-2 py-1.5 text-muted transition-colors duration-150 hover:text-fg max-[360px]:px-1.5 max-[360px]:text-[13px] sm:px-2.5"
                  aria-label={`Resume (${resume.label}, PDF)`}
                >
                  Resume
                </a>
              ) : (
                <Link
                  href="/#resume"
                  className="block whitespace-nowrap rounded-md px-2 py-1.5 text-muted transition-colors duration-150 hover:text-fg max-[360px]:px-1.5 max-[360px]:text-[13px] sm:px-2.5"
                >
                  Resume
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
