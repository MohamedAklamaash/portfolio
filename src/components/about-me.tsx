import { ScrollContext } from "@/lib/scroll-observer";
import Image from "next/image";
import { useContext, useRef } from "react";
import SlideUpWhenVisible from "./slide-up-when-visible";

const opacityForBlock = (sectionProgress: number, blockNo: number) => {
  const progress = sectionProgress - blockNo;
  if (progress >= 0 && progress < 1) return 1;
  
  // Ensure first block (image) is always visible on initial load
  if (blockNo === 0 && sectionProgress < 0.5) return 1;
  
  return 0.2;
};

const CONTENTS = [
  <>
    <Image
      className="rounded-xl self-center lg:self-start w-screen sm:w-[85vw] lg:w-[500px] h-auto"
      width={500}
      height={500}
      src="https://res.cloudinary.com/duhkiwuqq/image/upload/v1764422994/images/me_xy339m.png"
      alt="Mohamed Aklamaash"
      priority
    />
  </>,
  <>
    I&apos;m passionate about building at the intersection of{" "}
    <span className="bg-cyan text-black">data, engineering, and AI</span> —
    taking ideas from scratch and turning them into reliable, scalable, and
    impactful solutions. I thrive in fast-paced environments where curiosity,
    persistence, and problem-solving matter more than just checking boxes.
  </>,
  <>
    My technical stack spans{" "}
    <span className="bg-cyan text-black">
      backend development (Python, Django, NestJS), ML/AI (PyTorch, LangChain,
      RAG), and cloud infrastructure (AWS, GCP, Kubernetes, Docker)
    </span>
    . I focus on building systems that not only work but scale efficiently and
    maintain security at their core.
  </>,
  <>
    Outside of engineering, I&apos;m a competitive chess player with regional
    tournament experience. Chess shapes how I approach problems —{" "}
    <span className="bg-cyan text-black">
      strategically, creatively, and always thinking several moves ahead
    </span>
    . This mindset translates directly into how I architect systems and solve
    complex technical challenges.
  </>,
];

const AboutMe = () => {
  const { scrollY } = useContext(ScrollContext);

  const refContainer = useRef(null);

  const numOfPages = CONTENTS.length;
  let progress = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH,
      ) / clientHeight;
    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

  return (
    <div ref={refContainer} className="pt-40 pb-60 bg-black text-[#F9FAFB]">
      <SlideUpWhenVisible threshold={0.2}>
        <div className="min-h-dscreen max-w-5xl mx-auto px-4 lg:px-8 pt-24 md:pt-28 lg:pt-36 flex flex-col justify-center items-center text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold">
          <div className="leading-[1.15] space-y-4">
            <p className="mb-2 text-gray-300">⚡️</p>
            {CONTENTS.map((content, i) => (
              <div
                key={i}
                className={`inline-block`}
                style={{ opacity: opacityForBlock(progress, i) }}
              >
                {content}
              </div>
            ))}
          </div>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default AboutMe;

