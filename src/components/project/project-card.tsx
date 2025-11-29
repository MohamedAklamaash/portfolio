import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Badge } from "@/components/ui/badge";
import { CustomTooltip } from "@/components/ui/tooltip";
import { PROJECTS_DATA } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MdPreview } from "react-icons/md";
import { SiGithub } from "react-icons/si";

type ProjectCardProps = (typeof PROJECTS_DATA)[number];

const ProjectCard: FC<ProjectCardProps> = ({
  deployedLink,
  githubLink,
  description,
  shortDescription,
  title,
  imageSrc,
  techStack,
}) => {
  return (
    <div className="group flex flex-col bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      <SlideUpWhenVisible>
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
          <Image
            src={imageSrc}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={title}
            width={600}
            height={400}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {title}
            </h3>
            <div className="flex items-center gap-x-3 text-zinc-500">
              {githubLink && (
                <Link href={githubLink} target="_blank">
                  <CustomTooltip content="View source code">
                    <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      <SiGithub className="w-5 h-5" />
                    </div>
                  </CustomTooltip>
                </Link>
              )}

              {deployedLink && (
                <Link href={deployedLink} target="_blank">
                  <CustomTooltip content="View deployed">
                    <div className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      <MdPreview className="w-6 h-6" />
                    </div>
                  </CustomTooltip>
                </Link>
              )}
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed flex-grow">
            {shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {techStack?.slice(0, 4).map((stack) => (
              <Badge
                key={stack.title}
                variant="secondary"
                className="px-2 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {stack.title}
              </Badge>
            ))}
            {techStack && techStack.length > 4 && (
               <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                  +{techStack.length - 4}
               </Badge>
            )}
          </div>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default ProjectCard;
