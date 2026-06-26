import { ScrollContext } from "@/lib/scroll-observer";
import Image from "next/image";
import { useContext, useRef } from "react";

const opacityForBlock = (progress: number, blockNo: number) => {
  const p = progress - blockNo;
  if (blockNo === 0 && progress < 0.5) return 1;
  if (p >= 0 && p < 1) return 1;
  return 0.15;
};

const CONTENTS = [
  <>
    <Image
      className="rounded-sm self-center lg:self-start w-full sm:w-[85vw] lg:w-[420px] h-auto"
      width={420}
      height={420}
      src="/me.png"
      alt="Mohamed Aklamaash"
      priority
      style={{ filter: "grayscale(20%) contrast(1.05)" }}
    />
  </>,
  <>
    I genuinely enjoy the process of figuring things out—whether that&apos;s debugging a subtle race condition, understanding why a model underperforms, or learning a new tool from scratch.{" "}
    <span style={{ color: "var(--amber)", fontStyle: "italic" }}>Most of what I&apos;ve built started as &ldquo;I wonder how this actually works&rdquo;</span>—and the fastest way I&apos;ve found to answer that is to build the real thing.
  </>,
  <>
    Lately that&apos;s meant going deep on{" "}
    <span style={{ color: "var(--amber)", fontStyle: "italic" }}>LLM internals—training models from scratch, adversarial evaluation, and multi-agent systems</span>
    —alongside the backend and cloud infrastructure that runs them. Not because I set out to collect tools, but because each project pulled me somewhere new and I followed the curiosity.
  </>,
  <>
    I also play chess, which has mostly taught me patience and that{" "}
    <span style={{ color: "var(--amber)", fontStyle: "italic" }}>slowing down to think usually beats moving fast and hoping for the best</span>.
    I try to carry that into how I approach engineering problems too.
  </>,
];

const AboutMe = () => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef<HTMLDivElement>(null);
  const numOfPages = CONTENTS.length;
  let progress = 0;

  const { current: el } = refContainer;
  if (el) {
    const { clientHeight, offsetTop } = el;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY =
      Math.min(clientHeight + halfH, Math.max(-screenH, scrollY - offsetTop) + halfH) / clientHeight;
    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

  return (
    <div
      ref={refContainer}
      className="pt-32 pb-48"
      style={{ background: "var(--bg-2)" }}
    >
      {/* Section label */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
          About
        </span>
        <span className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      <div className="min-h-dscreen max-w-5xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
        <div
          className="space-y-8 font-display leading-[1.2]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "var(--text)" }}
        >
          {CONTENTS.map((content, i) => (
            <div
              key={i}
              style={{
                opacity: opacityForBlock(progress, i),
                transition: "opacity 0.4s ease",
              }}
            >
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
