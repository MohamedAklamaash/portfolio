import { SOCIALS } from "@/lib/constants";
import { TRACKS, otherTrack, type TrackId } from "@/lib/tracks";
import type { CommandContext, TerminalCommand } from "./types";

const SECTION_ROUTES: Record<string, (t: TrackId) => string> = {
  home: (t) => `/${t}`,
  about: (t) => `/${t}`,
  projects: (t) => `/${t}/projects`,
  experience: (t) => `/${t}/experience`,
  skills: (t) => `/${t}/skills`,
  posts: () => `/posts`,
};

const EXTERNAL: Record<string, string> = {
  github: SOCIALS.github,
  linkedin: SOCIALS.linkedin,
  email: SOCIALS.email,
};

const externalFor = (target: string, t: TrackId): string | undefined =>
  target === "resume" ? TRACKS[t].resume : EXTERNAL[target];

const SECTIONS = ["about", "projects", "experience", "skills", "posts"];

const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - s.length));

function goSection(target: string | undefined, ctx: CommandContext) {
  if (!target) {
    ctx.print("usage: cd <section> — try `ls`", "error");
    return;
  }
  const key = target.replace(/^~\/?/, "").replace(/\/$/, "") || "home";
  const norm = key === ".." || key === "~" || key === "" ? "home" : key;
  const route = SECTION_ROUTES[norm];
  if (!route) {
    ctx.print(`no such section: ${target} — try \`ls\``, "error");
    return;
  }
  ctx.print(`→ ${route(ctx.track)}`, "accent");
  ctx.navigate(route(ctx.track));
}

export function buildCommands(): Record<string, TerminalCommand> {
  const commands: Record<string, TerminalCommand> = {};
  const add = (c: TerminalCommand, ...aliases: string[]) => {
    commands[c.name] = c;
    for (const a of aliases) commands[a] = c;
  };

  add({
    name: "help",
    summary: "list available commands",
    run: (_a, ctx) => {
      const shown = Object.values(ctx.commands).filter(
        (c, i, arr) => !c.hidden && arr.findIndex((x) => x.name === c.name) === i
      );
      ctx.print("available commands:", "system");
      shown.forEach((c) =>
        ctx.print(`  ${pad(c.usage ?? c.name, 22)}${c.summary}`)
      );
      ctx.print("tip: press tab to autocomplete, ↑/↓ for history.", "system");
    },
  });

  add({
    name: "whoami",
    summary: "print identity",
    run: (_a, ctx) => {
      TRACKS[ctx.track].terminalIdentity.forEach(([k, v]) =>
        ctx.print(`  ${pad(k, 9)}${v}`, k === "status" ? "accent" : "output")
      );
    },
  });

  add({
    name: "ls",
    summary: "list sections",
    run: (_a, ctx) => ctx.print("  " + SECTIONS.join("   ")),
  });

  add({
    name: "cd",
    usage: "cd <section>",
    summary: "go to a section",
    run: (args, ctx) => goSection(args[0], ctx),
  });

  add(
    {
      name: "open",
      usage: "open <target>",
      summary: "open a section or link (github, linkedin, resume, email)",
      run: (args, ctx) => {
        const target = args[0]?.toLowerCase();
        if (!target) {
          ctx.print("usage: open <github|linkedin|resume|email|section>", "error");
          return;
        }
        const url = externalFor(target, ctx.track);
        if (url) {
          ctx.print(`opening ${target}…`, "accent");
          ctx.openExternal(url);
          return;
        }
        goSection(target, ctx);
      },
    },
    "o"
  );

  // Section shortcuts
  (["projects", "experience", "skills"] as const).forEach((s) =>
    add({ name: s, summary: `go to ${s}`, hidden: true, run: (_a, ctx) => goSection(s, ctx) })
  );

  add({
    name: "switch",
    usage: "switch [track]",
    summary: "switch between software / ai-ml",
    run: (args, ctx) => {
      const requested = args[0]?.toLowerCase();
      const next =
        requested === "software" || requested === "ai-ml"
          ? (requested as TrackId)
          : otherTrack(ctx.track);
      ctx.print(`switching to ${TRACKS[next].label}…`, "accent");
      ctx.switchTrack(next);
    },
  });

  add({
    name: "clear",
    summary: "clear the screen",
    run: (_a, ctx) => ctx.clear(),
  }, "cls");

  add({
    name: "exit",
    summary: "close the terminal",
    run: (_a, ctx) => ctx.close(),
  }, "q", "quit");

  // ── Easter eggs ────────────────────────────────────────────────────────────
  add({
    name: "sudo",
    summary: "",
    hidden: true,
    run: (_a, ctx) => ctx.print("nice try. you already have root here.", "error"),
  });
  add({
    name: "rm",
    summary: "",
    hidden: true,
    run: (args, ctx) =>
      ctx.print(
        args.join(" ").includes("-rf")
          ? "rm: refusing to delete a perfectly good portfolio."
          : "rm: nothing here is yours to delete.",
        "error"
      ),
  });
  add({
    name: "coffee",
    summary: "",
    hidden: true,
    run: (_a, ctx) => ctx.print("☕ brewing… type `help` while you wait.", "accent"),
  });
  add({
    name: "theme",
    summary: "",
    hidden: true,
    run: (_a, ctx) => ctx.print("amber on near-black. the only correct theme.", "accent"),
  });

  return commands;
}
