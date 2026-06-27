import { BriefcaseIcon, CpuIcon, FileUserIcon, FolderClosedIcon, HouseIcon, TextIcon, TerminalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_TRACK,
  isTrackId,
  rememberTrack,
  TRACK_IDS,
  TRACKS,
  type TrackId,
} from "@/lib/tracks";
import { useTerminal } from "@/lib/terminal/terminal-context";

type Section = "home" | "experience" | "skills" | "projects" | "posts" | null;

const navItems: {
  name: string;
  section: Section;
  href: (t: TrackId) => string;
  icon: JSX.Element;
  file?: boolean;
}[] = [
  { name: "Home", section: "home", href: (t) => `/${t}`, icon: <HouseIcon size={15} /> },
  { name: "Experience", section: "experience", href: (t) => `/${t}/experience`, icon: <BriefcaseIcon size={15} /> },
  { name: "Skills", section: "skills", href: (t) => `/${t}/skills`, icon: <CpuIcon size={15} /> },
  { name: "Projects", section: "projects", href: (t) => `/${t}/projects`, icon: <FolderClosedIcon size={15} /> },
  { name: "Posts", section: "posts", href: () => `/posts`, icon: <TextIcon size={15} /> },
  { name: "Resume", section: null, href: () => `/resume.pdf`, icon: <FileUserIcon size={15} /> },
];

const Navbar = () => {
  const router = useRouter();
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [revealed, setRevealed] = useState(false);
  const { toggle } = useTerminal();

  // Resolve current track + section from the path.
  const segs = router.asPath.split("#")[0].split("?")[0].split("/");
  const track: TrackId = isTrackId(segs[1]) ? segs[1] : DEFAULT_TRACK;
  const section: Section = isTrackId(segs[1])
    ? ((segs[2] as Section) || "home")
    : segs[1] === "posts"
    ? "posts"
    : null;

  useEffect(() => {
    const idx = navItems.findIndex((t) => t.section && t.section === section);
    setActiveTabIndex(idx === -1 ? null : idx);
  }, [section]);

  useEffect(() => {
    if (activeTabIndex === null) {
      setPill({ left: 0, width: 0 });
      return;
    }
    const setPos = () => {
      const el = tabsRef.current[activeTabIndex] as HTMLElement;
      setPill({ left: el?.offsetLeft ?? 0, width: el?.clientWidth ?? 0 });
    };
    setPos();
    window.addEventListener("resize", setPos);
    return () => window.removeEventListener("resize", setPos);
  }, [activeTabIndex]);

  // Hide the dock at the very top; reveal on scroll. Always show on short pages.
  useEffect(() => {
    const update = () => {
      const notScrollable = document.documentElement.scrollHeight - window.innerHeight < 80;
      setRevealed(notScrollable || window.scrollY > 64);
    };
    update();
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [router.pathname]);

  const switchTo = (t: TrackId) => {
    if (t === track && isTrackId(segs[1])) return;
    rememberTrack(t);
    const dest = isTrackId(segs[1]) ? ((segs[1] = t), segs.join("/")) : `/${t}`;
    router.push(dest || `/${t}`);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 mx-auto mb-5 flex h-12 px-4 transition-all duration-500 ease-out"
      style={{
        transform: revealed ? "translateY(0)" : "translateY(150%)",
        opacity: revealed ? 1 : 0,
        pointerEvents: revealed ? "auto" : "none",
      }}
    >
      <nav
        className="relative mx-auto flex h-full items-center rounded-sm px-1"
        style={{
          background: "rgba(20,20,20,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--border-2)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Active pill */}
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden p-1 transition-all duration-300"
          style={{ left: pill.left, width: pill.width }}
        >
          <span className="h-full w-full rounded-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }} />
        </span>

        {navItems.map((tab, index) => {
          const isActive = activeTabIndex === index;
          const cls = `inline-flex cursor-pointer items-center justify-center gap-1.5 px-3 h-full text-xs transition-colors duration-200 font-mono tracking-wide ${
            isActive ? "text-amber" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
          }`;
          return tab.file ? (
            <a
              key={index}
              href={tab.href(track)}
              ref={(el) => (tabsRef.current[index] = el)}
              className={cls}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </a>
          ) : (
            <Link
              key={index}
              href={tab.href(track)}
              ref={(el) => (tabsRef.current[index] = el)}
              className={cls}
              style={isActive ? { color: "var(--amber)" } : {}}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </Link>
          );
        })}

        {/* Divider */}
        <span className="mx-1 h-5 w-px shrink-0" style={{ background: "var(--border-2)" }} />

        {/* Terminal launcher */}
        <button
          onClick={toggle}
          aria-label="Open terminal"
          title="Terminal ( ` )"
          className="inline-flex items-center justify-center h-full px-2.5 transition-colors duration-200 text-[var(--text-3)] hover:text-[var(--amber)]"
        >
          <TerminalIcon size={15} />
        </button>

        {/* Track switcher */}
        <div className="flex items-center rounded-sm overflow-hidden ml-1 mr-0.5" style={{ border: "1px solid var(--border-2)" }}>
          {TRACK_IDS.map((t) => {
            const on = t === track;
            return (
              <button
                key={t}
                onClick={() => switchTo(t)}
                aria-label={`Switch to ${TRACKS[t].label}`}
                aria-pressed={on}
                className="px-2.5 h-7 font-mono text-[11px] tracking-wide transition-colors duration-200"
                style={{
                  background: on ? "var(--amber)" : "transparent",
                  color: on ? "var(--bg)" : "var(--text-3)",
                  fontWeight: on ? 600 : 400,
                }}
              >
                <span className="hidden sm:inline">{TRACKS[t].label}</span>
                <span className="sm:hidden">{t === "software" ? "SW" : "AI"}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
