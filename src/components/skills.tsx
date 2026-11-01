import type { SkillGroup } from "@/content/profiles";

const Skills = ({ groups }: { groups: SkillGroup[] }) => (
  <dl className="divide-y divide-line rounded-lg border border-line">
    {groups.map((g) => (
      <div
        key={g.title}
        className="grid gap-2 px-4 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:px-5"
      >
        <dt className="text-[14px] font-medium text-fg">{g.title}</dt>
        <dd>
          <p className="text-[15px] leading-7 text-body">
            {g.items.join(", ")}
          </p>
          <p className="mt-1 text-[13px] leading-5 text-subtle">
            Used in: {g.usedIn}
          </p>
        </dd>
      </div>
    ))}
  </dl>
);

export default Skills;
