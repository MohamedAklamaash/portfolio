import AboutMe from "@/components/about-me";
import FeaturedProjects from "@/components/featured-projects";
import ContactSection from "@/components/contact-section";
import Link from "@/components/ui/link";
import { SOCIALS } from "@/lib/constants";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { MailIcon, ArrowDownIcon } from "lucide-react";

const Landing = () => (
  <>
    <Intro />
    <AboutMe />
    <FeaturedProjects />
    <ContactSection />
  </>
);

export default Landing;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "35vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Subtle mouse-parallax for the ambient glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{ background: "var(--bg)" }}
    >
      {/* Mouse-tracked ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]: number[]) =>
              `radial-gradient(ellipse 55% 45% at ${x * 100}% ${y * 100}%, rgba(212,168,83,0.18) 0%, transparent 65%)`
          ),
        }}
      />

      {/* Static grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Decorative corner lines */}
      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none" style={{ borderTop: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" }} />
      <div className="absolute top-8 right-8 w-12 h-12 pointer-events-none" style={{ borderTop: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" }} />
      <div className="absolute bottom-20 left-8 w-12 h-12 pointer-events-none" style={{ borderBottom: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" }} />
      <div className="absolute bottom-20 right-8 w-12 h-12 pointer-events-none" style={{ borderBottom: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" }} />

      <motion.div
        style={{ y, opacity }}
        className="h-full flex flex-col justify-start pt-32 md:justify-center md:pt-0 px-6 md:px-16 lg:px-24 max-w-6xl mx-auto"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">

          {/* Role badge */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span
              className="font-mono text-xs tracking-[0.18em] uppercase px-3 py-1"
              style={{
                color: "var(--amber)",
                border: "1px solid var(--amber-dim)",
                borderRadius: "2px",
                background: "var(--amber-glow)",
              }}
            >
              AI / ML &amp; Software Engineer
            </span>
            <span className="h-px w-8" style={{ background: "var(--border-2)" }} />
            <span className="font-mono text-xs tracking-wide" style={{ color: "var(--text-3)" }}>
              Backend · ML Systems · Cloud
            </span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              variants={item}
              className="font-display leading-[0.92]"
              style={{ fontSize: "clamp(4.2rem, 16vw, 10rem)", color: "var(--text)" }}
            >
              Mohamed
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={item}
              className="leading-[0.92]"
              style={{
                fontSize: "clamp(4.2rem, 16vw, 10rem)",
                color: "var(--amber)",
                fontStyle: "italic",
                fontFamily: "var(--font-serif)"
              }}
            >
              Aklamaash
            </motion.h1>
          </div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="max-w-md text-base leading-[1.65] mb-8"
            style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}
          >
            I build ML systems and the backends that run them — I&apos;ve trained
            small language models from scratch, built a benchmark for LLM adversarial
            robustness, and spend most of my time across backend and cloud
            infrastructure. Currently working on AI security at{" "}
            <a href="https://www.unboundsecurity.ai" target="_blank" rel="noopener noreferrer" className="link-amber">
              Unbound Security (YC S24)
            </a>
            , and pursuing an integrated M.Sc. in Data Science at{" "}
            <a href="https://www.psgtech.edu" target="_blank" rel="noopener noreferrer" className="link-amber">
              PSG College of Technology
            </a>
            {" "}(expected 2027).
          </motion.p>

          {/* Status dot */}
          <motion.div variants={item} className="flex items-center gap-2 mb-10">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
            <span className="font-mono text-xs" style={{ color: "var(--text-3)" }}>
              Open to AI/ML &amp; backend / SRE roles
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Link href={SOCIALS.email}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-mono tracking-wide"
                style={{ background: "var(--amber)", color: "var(--bg)", borderRadius: "2px", fontWeight: 500 }}
              >
                <MailIcon size={13} />
                Say Hello
              </motion.button>
            </Link>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.03, borderColor: "var(--amber-dim)", color: "var(--amber)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-mono tracking-wide"
                style={{ background: "transparent", color: "var(--text-2)", border: "1px solid var(--border-2)", borderRadius: "2px" }}
              >
                Resume
              </motion.button>
            </a>

            <div className="flex items-center gap-2 ml-1">
              {[
                { href: SOCIALS.github, icon: <SiGithub size={15} />, label: "GitHub" },
                { href: SOCIALS.linkedin, icon: <SiLinkedin size={15} />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <motion.div
                    whileHover={{ scale: 1.1, color: "var(--amber)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-9 h-9"
                    style={{ color: "var(--text-3)", border: "1px solid var(--border)", borderRadius: "2px" }}
                  >
                    {icon}
                  </motion.div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDownIcon size={13} style={{ color: "var(--text-3)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};
