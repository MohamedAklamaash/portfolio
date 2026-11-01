import { TALE } from "@/content/profiles";
import { ArrowUpRight } from "./icons";
import Status from "./status";

const TaleFeature = () => (
  <article
    aria-labelledby="p-tale"
    className="relative overflow-hidden rounded-lg border border-line-strong bg-surface"
  >
    {/* A single thin accent line marks the featured product. No glow. */}
    <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent/70" />
    <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="label">{TALE.kind}</span>
          <span aria-hidden className="text-line-strong">
            ·
          </span>
          <Status label={TALE.status} tone="active" />
        </div>
        <h3
          id="p-tale"
          className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-fg"
        >
          {TALE.name}
        </h3>
        <p className="mt-2 max-w-prose text-[15px] leading-7 text-body">
          {TALE.summary}
        </p>
        <p className="mt-3 max-w-prose text-[14px] leading-6 text-muted">
          {TALE.detail}
        </p>
      </div>
      <a
        href={TALE.url}
        className="inline-flex items-center gap-2 self-start rounded-md border border-line-strong bg-surface-2 px-3.5 py-2 text-[14px] font-medium text-fg transition-colors duration-150 hover:border-accent/60"
      >
        Open {TALE.urlLabel}
        <ArrowUpRight className="text-accent" />
      </a>
    </div>
  </article>
);

export default TaleFeature;
