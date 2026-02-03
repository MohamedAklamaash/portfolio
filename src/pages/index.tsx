import AboutMe from "@/components/about-me";
import FloatingWithImages from "@/components/floating-with-images";
import FeaturedProjects from "@/components/featured-projects";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SiLinkedin } from "react-icons/si";

const CURRENT_SECTION = [
  {
    start: "Previously building secure systems at",
    end: (
      <Link
        href="https://www.unboundsecurity.ai"
        className="blue-text underline"
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
        className="blue-text underline"
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
      <FeaturedProjects />
      <ContactSection />
    </>
  );
};

export default Landing;

const Intro = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div ref={container} className="h-screen overflow-hidden">
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
                  Software Engineer who was previously at{" "}
                </p>
                <Link
                  href="https://www.unboundsecurity.ai"
                  className="blue-text underline"
                  target="_blank"
                >
                  Unbound Security (YC S24)
                </Link>
                <p className="inline">
                  {" "}and currently pursuing M.Sc. Data Science at{" "}
                </p>
                <Link
                  href="https://www.psgtech.edu"
                  className="blue-text underline"
                  target="_blank"
                >
                  PSG College of Technology
                </Link>
                <p className="inline">
                  . I specialize in engineering scalable backend systems, deploying ML/AI pipelines, and optimizing cloud infrastructure.
                  This portfolio showcases my work in building reliable, high-performance solutions.
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
            asChild
            variant="ghost"
            className="bg-gray-100 text-gray-400 rounded-3xl hover:text-gray-500 flex"
          >
            <Link href={SOCIALS.linkedin}>
              <SiLinkedin className="h-4 w-4" />
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
      {LINKS.map((link) => {
        const isFile = link.link.endsWith(".pdf");
        return (
          <motion.div key={link.title} variants={animate ? variants : {}}>
            <Button
              asChild
              variant="ghost"
              className="bg-gray-100 text-gray-400 rounded-3xl hover:text-gray-500"
            >
              {isFile ? (
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              ) : (
                <Link href={link.link}>
                  {link.title}
                </Link>
              )}
            </Button>
          </motion.div>
        );
      })}
    </>
  );
};
