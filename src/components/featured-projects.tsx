import { FEATURED_PROJECTS } from "@/lib/projects";
import ProjectCard from "@/components/project/project-card";
import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const FeaturedProjects = () => {
  // Limit to top 3 featured projects
  const projects = FEATURED_PROJECTS.slice(0, 3);

  return (
    <div className="py-16 px-4 lg:px-8 max-w-5xl mx-auto">
      <SlideUpWhenVisible>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              Featured Projects
            </h2>
            <p className="text-gray-400">
              Some of the highlights from my work.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 group">
              View All 
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                shortDescription={project.shortDescription}
                isFeatured={project.isFeatured}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                deployedLink={project.deployedLink}
                githubLink={project.githubLink}
                techStack={project.techStack}
              />
            ))}
          </div>
        
        <div className="mt-8 md:hidden flex justify-center">
          <Link href="/projects">
            <Button variant="outline" className="flex items-center gap-2">
              View All Projects
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default FeaturedProjects;

