import type { CaseSection as CaseSectionData } from "@/content/projects";
import Flow from "./flow";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const CaseSection = ({ section }: { section: CaseSectionData }) => {
  const id = slugify(section.heading);
  return (
    <section aria-labelledby={id} className="mt-12 first:mt-0">
      <h2
        id={id}
        className="text-[20px] font-semibold tracking-[-0.015em] text-fg"
      >
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-[1.75] text-body">
        {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
      </div>
      {section.flow && <Flow {...section.flow} />}
      {section.list && (
        <ul className="mt-4 space-y-3 text-[16px] leading-[1.7] text-body">
          {section.list.map((li) => (
            <li key={li} className="relative pl-5">
              <span
                aria-hidden
                className="absolute left-0 top-[13px] h-px w-2.5 bg-subtle"
              />
              {li}
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <figure className="mt-6">
          <div
            className="overflow-x-auto rounded-lg border border-line"
            tabIndex={0}
            role="region"
            aria-label={section.table.caption}
          >
            <table className="w-full min-w-[34rem] border-collapse text-left text-[14px]">
              <caption className="sr-only">{section.table.caption}</caption>
              <thead className="bg-surface-2">
                <tr>
                  {section.table.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-line px-4 py-2.5 font-medium text-fg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row) => (
                  <tr
                    key={row.join("|")}
                    className="border-b border-line last:border-0"
                  >
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th
                          key={i}
                          scope="row"
                          className="px-4 py-2.5 align-top font-normal text-fg"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td
                          key={i}
                          className="px-4 py-2.5 align-top font-mono text-[13px] leading-5 text-muted"
                        >
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-2 text-[13px] text-subtle">
            {section.table.caption}
          </figcaption>
        </figure>
      )}
      {section.code && (
        <figure className="mt-6">
          <div className="overflow-hidden rounded-lg border border-line">
            <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2">
              <span className="font-mono text-[12px] text-muted">
                {section.code.source}
              </span>
              <span className="font-mono text-[12px] text-subtle">
                {section.code.language}
              </span>
            </div>
            <pre
              className="overflow-x-auto bg-surface p-4 font-mono text-[13px] leading-6 text-body"
              tabIndex={0}
            >
              <code>{section.code.code}</code>
            </pre>
          </div>
          <figcaption className="mt-2 text-[13px] text-subtle">
            {section.code.caption}
          </figcaption>
        </figure>
      )}
    </section>
  );
};

export default CaseSection;
