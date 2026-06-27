import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import Link from "next/link";
import { SOCIALS } from "@/lib/constants";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { MailIcon } from "lucide-react";

const ContactSection = () => {
  return (
    <div
      className="py-32 px-6"
      style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)" }}
    >
      <SlideUpWhenVisible>
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
              Contact
            </span>
            <span className="h-px w-12" style={{ background: "var(--border)" }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div>
              <h2
                className="font-display leading-none mb-6"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "var(--text)" }}
              >
                Let&apos;s build<br />
                <span style={{ color: "var(--amber)", fontStyle: "italic" }}>something.</span>
              </h2>
              <p
                className="max-w-md text-base leading-relaxed"
                style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}
              >
                My inbox is always open—for roles, collaborations, or just an interesting problem worth talking through. If something here caught your eye, say hi.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link href={SOCIALS.email} target="_blank">
                <button
                  className="flex items-center gap-3 px-8 py-3.5 font-mono text-sm tracking-wide transition-all duration-200 w-full justify-center"
                  style={{
                    background: "var(--amber)",
                    color: "var(--bg)",
                    borderRadius: "2px",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e8bc6a")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--amber)")}
                >
                  <MailIcon size={15} />
                  Say Hello
                </button>
              </Link>

              <div className="flex items-center justify-center gap-3">
                {[
                  { href: SOCIALS.github, icon: <SiGithub size={18} />, label: "GitHub" },
                  { href: SOCIALS.linkedin, icon: <SiLinkedin size={18} />, label: "LinkedIn" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs tracking-wide transition-all duration-200"
                    style={{
                      color: "var(--text-3)",
                      border: "1px solid var(--border-2)",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--amber-dim)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-2)";
                    }}
                  >
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div className="mt-20 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="font-mono text-xs" style={{ color: "var(--text-3)" }}>
              © 2026 Mohamed Aklamaash
            </span>
            <a
              href="https://github.com/MohamedAklamaash/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)")}
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default ContactSection;
