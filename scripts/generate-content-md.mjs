// Writes CONTENT.md from the typed content in src/content, so the review copy
// can never drift from what the site renders. Run with: pnpm content:md
import { build } from "esbuild";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const out = "node_modules/.cache/content-md.mjs";
await build({
  stdin: {
    contents: `export * from "./src/content/site"; export * from "./src/content/profiles"; export * from "./src/content/experience"; export * from "./src/content/projects";`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: out,
  logLevel: "silent",
});
const c = await import(pathToFileURL(out).href + `?t=${Date.now()}`);

const L = [];
const p = (...lines) => L.push(...lines);
const list = (items) => items.forEach((i) => p(`- ${i}`));

p(
  "# Website copy",
  "",
  "Generated from `src/content/*` by `pnpm content:md`. Edit the TypeScript files, not this one, then regenerate.",
  "",
  "## Shared identity",
  "",
  `- Name: ${c.PERSON.name} (short: ${c.PERSON.shortName}; full: ${c.PERSON.fullName})`,
  `- Location: ${c.PERSON.location}`,
  `- Email: ${c.PERSON.email}`,
  `- GitHub: ${c.PERSON.github}`,
  `- LinkedIn: ${c.PERSON.linkedin}`,
  `- Education: ${c.EDUCATION.degree}, ${c.EDUCATION.school}, ${c.EDUCATION.dates}`,
  `- Resumes: ${c.RESUMES.software.href}, ${c.RESUMES.ai.href}`,
  "",
  "## Homepage `/`",
  "",
  `**Title:** ${c.HOME.seo.title}`,
  "",
  `**Description:** ${c.HOME.seo.description}`,
  "",
  `### ${c.HOME.greeting}`,
  ""
);
c.HOME.intro.forEach((t) => p(t, ""));
p("**Paths**", "");
for (const [id, card] of Object.entries(c.HOME.paths)) p(`- **${card.title}** (/${id}): ${card.description} Including ${card.examples}.`);
p("", "**Right now**", "");
list(c.HOME.now.map((n) => `${n.label}: ${n.text}`));

p("", "## Tale Analytics (featured on /software)", "", `${c.TALE.summary}`, "", c.TALE.detail, "", `Link: ${c.TALE.url} · Status: ${c.TALE.status}`, "");

for (const prof of Object.values(c.PROFILES)) {
  p(
    `## ${prof.eyebrow} \`${c.PROFILE_PATHS[prof.id]}\``,
    "",
    `**Title:** ${prof.seo.title}`,
    "",
    `**Description:** ${prof.seo.description}`,
    "",
    `### ${prof.heading}`,
    ""
  );
  prof.intro.forEach((t) => p(t, ""));
  p(prof.lookingFor, "", "**Focus:** " + prof.focus.join(" · "), "", `**${prof.projectsHeading}:** ${prof.projectsIntro}`, "");
  p("**Projects:** " + c.projectsFor(prof.id).map((x) => x.name).join(", "), "");
  p(`**Experience intro:** ${prof.experienceIntro}`, "", "**Technical areas**", "");
  list(prof.skills.map((g) => `${g.title}: ${g.items.join(", ")} (used in: ${g.usedIn})`));
  p("", `**Cross-link:** ${prof.crossLink}`, "");
}

p("## Experience (shared by every page)", "");
for (const e of c.EXPERIENCE) {
  p(`### ${e.company} (${e.note}), ${e.location}`, "", e.summary, "");
  for (const r of e.roles) {
    p(`**${r.title}**, ${r.dates}`, "");
    list(r.points);
    p("", `Stack: ${r.stack.join(", ")}`, "");
  }
}

p("## Projects", "");
for (const pr of c.PROJECTS) {
  p(`### ${pr.name} (${pr.profile === "ai" ? "AI/ML" : "Software"}) · ${pr.kind} · ${pr.status.label} · ${pr.period}`, "");
  p(`**Summary:** ${pr.summary}`, "", `**What was interesting:** ${pr.interesting}`, "", `**My part:** ${pr.role}`, "", `**Stack:** ${pr.stack.join(", ")}`, "");
  p(`**Links:** ${pr.links.map((l) => `[${l.label}](${l.href})`).join(" · ")}${pr.post ? ` · [Write-up](${pr.post.href})` : ""}`, "");
  if (pr.figures) list(pr.figures.map((f) => `${f.value}: ${f.label}`)), p("");
  if (pr.caseStudy) {
    p(`#### Case study: ${pr.caseStudy.title}`, "", `_${pr.caseStudy.description}_`, "");
    for (const s of pr.caseStudy.sections) {
      p(`**${s.heading}**`, "");
      s.paragraphs?.forEach((t) => p(t, ""));
      if (s.flow) list(s.flow.steps.map((st, i) => `${i + 1}. ${st.title}${st.detail ? `: ${st.detail}` : ""}`)), p("");
      if (s.list) list(s.list), p("");
      if (s.table) {
        p(`| ${s.table.head.join(" | ")} |`, `|${s.table.head.map(() => "---").join("|")}|`);
        s.table.rows.forEach((r) => p(`| ${r.join(" | ")} |`));
        p("", `_${s.table.caption}_`, "");
      }
      if (s.code) p(`_Code excerpt from \`${s.code.source}\`: ${s.code.caption}_`, "");
    }
  }
}

writeFileSync("CONTENT.md", L.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");
console.log("CONTENT.md written");
