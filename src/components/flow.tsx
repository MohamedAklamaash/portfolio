import type { FlowStep } from "@/content/projects";

/**
 * A plain, accessible pipeline diagram: an ordered list drawn as a vertical
 * chain of steps. Needs no images and reads correctly in a screen reader.
 */
const Flow = ({ caption, steps }: { caption: string; steps: FlowStep[] }) => (
  <figure className="my-6">
    <ol className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="grid grid-cols-[2rem_1fr] gap-x-3 px-4 py-3 sm:grid-cols-[2rem_9rem_1fr]"
        >
          <span
            aria-hidden
            className="relative font-mono text-[12px] leading-6 text-accent"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] font-medium leading-6 text-fg">
            {s.title}
          </span>
          {s.detail && (
            <span className="col-start-2 text-[14px] leading-6 text-muted sm:col-start-3">
              {s.detail}
            </span>
          )}
        </li>
      ))}
    </ol>
    <figcaption className="mt-2 text-[13px] text-subtle">{caption}</figcaption>
  </figure>
);

export default Flow;
