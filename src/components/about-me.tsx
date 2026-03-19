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
      src="https://res.cloudinary.com/duhkiwuqq/image/upload/v1764422994/images/me_xy339m.png"
      alt="Mohamed Aklamaash"
      priority
      style={{ filter: "grayscale(20%) contrast(1.05)" }}
    />
  </>,
  <>
    I genuinely enjoy the process of figuring things out—whether that&apos;s debugging a subtle race condition, understanding why a model underperforms, or learning a new tool from scratch.{" "}
    <span style={{ color: "var(--amber)", fontStyle: "italic" }}>I pick things up fast</span>, and I find that the best way to learn is to just build something real with it.
  </>,
  <>
    So far that&apos;s meant working across{" "}
    <span style={{ color: "var(--amber)", fontStyle: "italic" }}>Django APIs, NestJS services, Kubernetes deployments, and RAG pipelines</span>
    —not because I set out to collect tools, but because each project pulled me somewhere new and I followed the curiosity.
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
