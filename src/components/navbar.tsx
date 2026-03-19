import { BriefcaseIcon, CpuIcon, FileUserIcon, FolderClosedIcon, HouseIcon, TextIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: <HouseIcon size={15} /> },
  { name: "Experience", href: "/experience", icon: <BriefcaseIcon size={15} /> },
  { name: "Skills", href: "/skills", icon: <CpuIcon size={15} /> },
  { name: "Projects", href: "/projects", icon: <FolderClosedIcon size={15} /> },
  { name: "Posts", href: "/posts", icon: <TextIcon size={15} /> },
  { name: "Resume", href: "/resume.pdf", icon: <FileUserIcon size={15} /> },
];

const Navbar = () => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    const currentPath = path.split("/")[1];
    const idx = navItems.findIndex((tab) => tab.href === `/${currentPath}`);
    setActiveTabIndex(idx);
  }, [router.pathname]);

  useEffect(() => {
    if (activeTabIndex === null) return;
    const setPos = () => {
      const el = tabsRef.current[activeTabIndex] as HTMLElement;
      setPill({ left: el?.offsetLeft ?? 0, width: el?.clientWidth ?? 0 });
    };
    setPos();
    window.addEventListener("resize", setPos);
    return () => window.removeEventListener("resize", setPos);
  }, [activeTabIndex]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 mx-auto mb-5 flex h-12 px-6">
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
          <span
            className="h-full w-full rounded-sm"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }}
          />
        </span>

        {navItems.map((tab, index) => {
          const isFile = tab.href.endsWith(".pdf");
          const isActive = activeTabIndex === index;
          const cls = `inline-flex cursor-pointer items-center justify-center gap-1.5 px-3 h-full text-xs transition-colors duration-200 font-mono tracking-wide ${
            isActive ? "text-amber" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
          }`;

          return isFile ? (
            <a
              key={index}
              href={tab.href}
              ref={(el) => (tabsRef.current[index] = el)}
              className={cls}
              style={isActive ? { color: "var(--amber)" } : {}}
              onClick={() => setActiveTabIndex(index)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </a>
          ) : (
            <Link
              key={index}
              href={tab.href}
              ref={(el) => (tabsRef.current[index] = el)}
              className={cls}
              style={isActive ? { color: "var(--amber)" } : {}}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
