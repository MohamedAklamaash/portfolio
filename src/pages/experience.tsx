import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/constants";
import { NextSeo } from "next-seo";
import { BriefcaseIcon } from "lucide-react";

const Experience = () => {
  return (
    <>
      <NextSeo
        title="Experience"
        description="My professional experience and work history."
      />
      <div className="pt-8 px-4 lg:px-24 lg:py-16 pb-24">
        <SlideUpWhenVisible>
          <div className="mb-8">
            <p className="text-3xl lg:text-5xl lg:mb-2 font-semibold tracking-tight">
              Experience
            </p>
            <p className="text-gray-400">
              My professional journey and where I&apos;ve worked.
            </p>
          </div>

          <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
            {EXPERIENCE.map((job, index) => (
              <div className="mb-10 ml-6" key={index}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <BriefcaseIcon className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {job.role}
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                    {job.company}
                  </span>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {job.duration}
                </time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SlideUpWhenVisible>
      </div>
    </>
  );
};

export default Experience;

