import { EXPERIENCE } from "@/content/experience";
import Chips from "./chips";
import { ArrowUpRight } from "./icons";

const Experience = () => (
  <div className="space-y-8">
    {EXPERIENCE.map((job) => (
      <article key={job.company} aria-labelledby={`exp-${job.company}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            id={`exp-${job.company}`}
            className="text-[17px] font-semibold text-fg"
          >
            <a
              href={job.url}
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              {job.company}
              <ArrowUpRight className="text-subtle" />
            </a>
            <span className="ml-2 font-mono text-[12px] font-normal text-subtle">
              {job.note}
            </span>
          </h3>
          <p className="text-[14px] text-subtle">{job.location}</p>
        </div>
        <p className="mt-2 max-w-prose text-[14px] leading-6 text-muted">
          {job.summary}
        </p>

        <ol className="mt-6 space-y-7 border-l border-line pl-5">
          {job.roles.map((role) => (
            <li key={role.start} className="relative">
              <span
                aria-hidden
                className="absolute -left-[23.5px] top-[7px] h-2 w-2 rounded-full border border-line-strong bg-bg"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-[15px] font-medium text-fg">
                  {role.title}
                </h4>
                <p className="font-mono text-[12px] text-subtle">
                  <time dateTime={role.start}>
                    {role.dates.split(" – ")[0]}
                  </time>{" "}
                  –{" "}
                  <time dateTime={role.end}>{role.dates.split(" – ")[1]}</time>
                </p>
              </div>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-7 text-body">
                {role.points.map((pt) => (
                  <li key={pt} className="relative pl-4">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[11px] h-px w-2 bg-subtle"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <Chips
                  items={role.stack}
                  label={`Technologies used as ${role.title}`}
                />
              </div>
            </li>
          ))}
        </ol>
      </article>
    ))}
  </div>
);

export default Experience;
