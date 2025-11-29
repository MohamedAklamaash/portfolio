import AboutMe from "@/components/about-me";
import FloatingWithImages from "@/components/floating-with-images";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SiLinkedin } from "react-icons/si";

const CURRENT_SECTION = [
  {
    start: "Building secure systems at",
    end: (
      <Link
        href="https://www.unboundsecurity.com"
        className="text-gray-200 underline"
        target="_blank"
      >
        Unbound Security (YC S24)
      </Link>
    ),
  },
  {
    start: "Pursuing M.Sc. Data Science at",
    end: (
      <Link
        href="https://www.psgtech.edu"
        className="text-gray-200 underline"
        target="_blank"
      >
        PSG College of Technology
      </Link>
    ),
  },
];

const LINKS = [
  {
    title: "Resume",
    link: "/resume.pdf",
  },
  {
    title: "GitHub",
    link: SOCIALS.github,
  },
  {
    title: "LinkedIn",
    link: SOCIALS.linkedin,
  },
  {
    title: "Projects",
    link: "/projects",
  },
];

const Landing = () => {
  return (
    <>
      <Intro />
      <AboutMe />
    </>
  );
};

export default Landing;

const Intro = () => {
  const container = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className="h-screen overflow-hidden">
      <motion.div style={{ y }} className="h-full relative">
        <div
          className={cn(
            "px-5 py-12 flex items-center justify-between min-h-dscreen h-full text-sm text-[0.9rem]",
          )}
        >
          <FloatingWithImages>
            <div className="md:max-w-lg mx-auto space-y-6">
              <div className="text-base tracking-tight">
                <p className="inline">
                  hey, i&apos;m{" "}
                  <span className="bg-green-200 font-medium">Mohamed Aklamaash</span>, a{" "}
                  Software Engineering Intern at{" "}
                </p>
                <Link
                  href="https://www.unboundsecurity.com"
                  className="underline"
                  target="_blank"
                >
                  Unbound Security (YC S24)
                </Link>
                <p className="inline">
                  {" "}and pursuing M.Sc. Data Science at{" "}
                </p>
                <Link
                  href="https://www.psgtech.edu"
                  className="underline"
                  target="_blank"
                >
                  PSG College of Technology
                </Link>
                <p className="inline">
                  . I specialize in backend development, ML/AI systems, and cloud infrastructure.
                  This is my corner of the web where I share my journey building reliable, scalable, and impactful solutions.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-[0.35rem] h-[0.35rem] rounded-full bg-green-400 animate-pulse" />
                  <p className="ml-2">Currently</p>
                </div>

                {CURRENT_SECTION.map((item, idx) => (
                  <li className="list-none ml-3 text-start" key={idx}>
                    <span className="text-gray-400">{item.start}</span>{" "}
                    {item.end}
                  </li>
                ))}
              </div>

              <div className="flex gap-2 flex-col md:flex-row">
                <Link href={SOCIALS.email} className="w-fit">
                  <Button className="rounded-3xl w-fit">Say Hello</Button>
                </Link>

                <OtherLinksSection />
              </div>
            </div>
          </FloatingWithImages>
        </div>
      </motion.div>
    </div>
  );
};

// const Logo = () => {
//   return (
//     <div className="md:text-lg text-white aspect-square w-fit h-auto items-center flex bg-black p-1 rounded-full md:mx-auto">
//       <p className="text-base">&#123;V&#125;</p>
//     </div>
//   );
// };

const OtherLinksSection = () => {
  return (
    <>
      <motion.div
        className="gap-2 group hidden md:flex"
        whileHover="visible"
        initial="hidden"
      >
        <motion.div>
          <Button
            variant="ghost"
            className="bg-gray-100 text-gray-400 rounded-3xl hover:text-gray-500 flex"
          >
            <Link href={SOCIALS.linkedin}>
              <Button variant="ghost" className="bg-gray-100 text-gray-400 rounded-3xl hover:text-gray-500 flex">
                <SiLinkedin className="h-4 w-4" />
              </Button>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={variants}
          transition={{
            duration: 0.5,
          }}
          className="contents"
        >
          <OtherLinks animate={true} />
        </motion.div>
      </motion.div>
      <div className="flex md:hidden gap-1">
        <OtherLinks animate={false} />
      </div>
    </>
  );
};

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const OtherLinks = ({ animate }: { animate: boolean }) => {
  return (
    <>
      {LINKS.map((link) => (
        <motion.div key={link.title} variants={animate ? variants : {}}>
          <Link href={link.link}>
            <Button
              variant="ghost"
              className="bg-gray-100 text-gray-400 rounded-3xl hover:text-gray-500"
            >
              {link.title}
            </Button>
          </Link>
        </motion.div>
      ))}
    </>
  );
};
