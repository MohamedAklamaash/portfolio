import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Visually smaller heading for secondary sections. */
  level?: 2 | 3;
}

const Section = ({ id, title, intro, children, className }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={cn("border-t border-line pt-10 sm:pt-12", className)}
  >
    <div className="grid gap-6 md:grid-cols-[13rem_1fr] md:gap-10">
      <div>
        <h2 id={`${id}-heading`} className="text-[15px] font-medium text-fg">
          {title}
        </h2>
        {intro && (
          <p className="mt-2 text-[14px] leading-6 text-muted md:max-w-[13rem]">
            {intro}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

export default Section;
