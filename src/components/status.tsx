import type { StatusTone } from "@/content/projects";
import { cn } from "@/lib/cn";

const DOT: Record<StatusTone, string> = {
  active: "bg-accent",
  released: "bg-[#7fb77e]",
  complete: "bg-[#8b8b94]",
  research: "bg-[#93a8d8]",
};

const Status = ({ label, tone }: { label: string; tone: StatusTone }) => (
  <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted">
    <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} />
    {label}
  </span>
);

export default Status;
