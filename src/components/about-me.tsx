import { ScrollContext } from "@/lib/scroll-observer";
import { TRACKS, type TrackId } from "@/lib/tracks";
import Image from "next/image";
import { useContext, useRef } from "react";

const opacityForBlock = (progress: number, blockNo: number) => {
  const p = progress - blockNo;
  if (blockNo === 0 && progress < 0.5) return 1;
  if (p >= 0 && p < 1) return 1;
  return 0.15;
};

const AboutMe = ({ track }: { track: TrackId }) => {
  const CONTENTS = [
    <Image
      key="photo"
      className="rounded-sm self-center lg:self-start w-full sm:w-[85vw] lg:w-[420px] h-auto"
      width={420}
      height={420}
      src="/me.png"
      alt="Mohamed Aklamaash"
      priority
      style={{ filter: "grayscale(20%) contrast(1.05)" }}
    />,
    ...TRACKS[track].aboutBlocks,
  ];

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
