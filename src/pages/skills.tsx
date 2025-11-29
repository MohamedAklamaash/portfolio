import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Badge } from "@/components/ui/badge";
import { SKILL_CATEGORIES } from "@/lib/skill-categories";
import { NextSeo } from "next-seo";

const Skills = () => {
  return (
    <>
      <NextSeo
        title="Skills"
        description="Technologies and tools I work with."
      />
      <div className="pt-8 px-4 lg:px-24 lg:py-16 pb-24">
        <SlideUpWhenVisible>
          <div className="mb-10">
            <p className="text-3xl lg:text-5xl lg:mb-2 font-semibold tracking-tight">
              Skills
            </p>
            <p className="text-gray-400">
              My technical proficiency across different domains.
            </p>
          </div>

          <div className="space-y-12">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl font-medium mb-4">{category.title}</h2>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.title}
                      variant="secondary"
                      className="text-[--color] px-3 py-1 text-sm"
                      style={{
                        // @ts-ignore
                        "--color": skill.color,
                      }}
                    >
                      {skill.title}
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

export default Skills;

