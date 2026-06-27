import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { PROJECTS_DATA, type ProjectTrack } from "./projects";
import { SKILL_CATEGORIES } from "./skill-categories";
import { EXPERIENCE } from "./constants";

export type TrackId = "software" | "ai-ml";

export const TRACK_IDS: TrackId[] = ["software", "ai-ml"];
export const DEFAULT_TRACK: TrackId = "software";
export const SECTIONS = ["projects", "experience", "skills"] as const;

export const otherTrack = (t: TrackId): TrackId =>
  t === "software" ? "ai-ml" : "software";

export const isTrackId = (v: string | undefined): v is TrackId =>
  v === "software" || v === "ai-ml";

const amber = (children: ReactNode) => (
  <span style={{ color: "var(--amber)", fontStyle: "italic" }}>{children}</span>
);

interface TrackConfig {
  id: TrackId;
  label: string;
  /** Maps to the existing ProjectTrack tag on PROJECTS_DATA. */
  projectTrack: ProjectTrack;
  /** Hero role badge text. */
  badge: string;
  /** Hero secondary line next to the badge. */
  subhead: string;
  /** Hero bio paragraph. */
  heroBio: ReactNode;
  /** Status-dot copy. */
  statusLine: string;
  /** About-section prose blocks (image lives in AboutMe). */
  aboutBlocks: ReactNode[];
  /** whoami key/value rows for the terminal. */
  terminalIdentity: [string, string][];
  seo: { title: string; description: string };
}

export const TRACKS: Record<TrackId, TrackConfig> = {
  software: {
    id: "software",
    label: "Software",
    projectTrack: "software",
    badge: "Software Engineer",
    subhead: "Backend · Distributed Systems · Cloud",
    heroBio: (
      <>
        I work on backends and the infrastructure under them — services, queues,
        and the cloud they run on. I care most about the parts that don&apos;t show
        up in a demo: code that stays readable, systems that fail predictably, and
        changes that ship without surprises. Right now I&apos;m engineering
        AI-security infrastructure at{" "}
        <a
          href="https://www.unboundsecurity.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="link-amber"
        >
          Unbound Security (YC S24)
        </a>
        , and pursuing an integrated M.Sc. in Data Science at{" "}
        <a
          href="https://www.psgtech.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="link-amber"
        >
          PSG College of Technology
        </a>{" "}
        (expected 2027).
      </>
    ),
    statusLine: "Open to backend / infra / SRE roles",
    aboutBlocks: [
      <>
        I like the part of engineering where something is misbehaving and nobody
        knows why yet. A race condition under load, a service that falls over at
        3am, a query that quietly got slow.{" "}
        {amber("I stay with a problem until I actually understand it, not just until the symptom goes away")}.
      </>,
      <>
        Most of what I build is backend and the infrastructure under it: services,
        queues, and the cloud they run on. {amber("I try to stay consistent about the parts that don't show up in a demo")}{" "}
        — clear names, small reviewable changes, and systems you can still reason
        about when something breaks. I&apos;d rather ship something steady that
        holds than something clever that surprises me later.
      </>,
      <>
        I play chess, which taught me patience and that{" "}
        {amber("a careful, thought-out move usually beats a fast, hopeful one")}. I
        try to bring the same discipline to engineering: understand the board
        first, then commit.
      </>,
    ],
    terminalIdentity: [
      ["role", "backend · distributed systems"],
      ["focus", "services · pipelines · cloud"],
      ["now", "infra @ Unbound"],
      ["stack", "go · python · aws · k8s"],
      ["status", "open to roles"],
    ],
    seo: {
      title: "Software Engineer",
      description:
        "Backend and infrastructure engineer — distributed systems, data pipelines, and cloud/SRE. Currently engineering AI-security infrastructure at Unbound Security (YC S24).",
    },
  },
  "ai-ml": {
    id: "ai-ml",
    label: "AI / ML",
    projectTrack: "research",
    badge: "AI / ML Engineer",
    subhead: "LLM Internals · Evals · Research",
    heroBio: (
      <>
        I work on the internals of language models — training small ones from
        scratch, building benchmarks for adversarial robustness, and measuring
        what they actually do instead of what I hope they do. I try to keep the
        work {amber("honest: reproducible runs, real baselines, numbers I'd trust myself")}.
        Currently working on AI security at{" "}
        <a
          href="https://www.unboundsecurity.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="link-amber"
        >
          Unbound Security (YC S24)
        </a>
        , and pursuing an integrated M.Sc. in Data Science at{" "}
        <a
          href="https://www.psgtech.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="link-amber"
        >
          PSG College of Technology
        </a>{" "}
        (expected 2027).
      </>
    ),
    statusLine: "Open to AI / ML & research roles",
    aboutBlocks: [
      <>
        I like the part of ML where the model is worse than it should be and the
        reason isn&apos;t obvious yet. Why a loss curve plateaus, why an eval drops,
        why an optimizer wins on one dataset and loses on another.{" "}
        {amber("I keep digging until the number actually makes sense")}.
      </>,
      <>
        Lately that has meant going deep on LLM internals: training models from
        scratch, adversarial evaluation, and the eval harnesses that keep me
        honest. {amber("I try to be disciplined about it — pinned datasets, seeded runs, baselines I don't quietly drop")}.
        A result only counts to me if I can reproduce it.
      </>,
      <>
        I play chess, which taught me patience and that{" "}
        {amber("a careful, thought-out move usually beats a fast, hopeful one")}. The
        same discipline shows up when I&apos;m reading a training run that went
        sideways.
      </>,
    ],
    terminalIdentity: [
      ["role", "ml-systems · research"],
      ["focus", "llm internals · evals"],
      ["now", "AI security @ Unbound"],
      ["stack", "pytorch · python · cuda"],
      ["status", "open to roles"],
    ],
    seo: {
      title: "AI / ML Engineer",
      description:
        "AI/ML engineer — trains language models from scratch, builds LLM adversarial-robustness benchmarks, and studies model internals. Currently working on AI security at Unbound Security (YC S24).",
    },
  },
};

// ── Selectors ────────────────────────────────────────────────────────────────

export const projectsForTrack = (t: TrackId) =>
  PROJECTS_DATA.filter((p) => p.track === TRACKS[t].projectTrack);

export const featuredForTrack = (t: TrackId) =>
  projectsForTrack(t).filter((p) => p.isFeatured);

export const skillsForTrack = (t: TrackId) =>
  SKILL_CATEGORIES.filter((c) => !c.track || c.track === "both" || c.track === t);

export const experienceForTrack = (t: TrackId) =>
  EXPERIENCE.map((job) => ({
    ...job,
    description: job.description.filter(
      (b) => b.track === "both" || b.track === t
    ),
  })).filter((job) => job.description.length > 0);

// ── Current-track hook ───────────────────────────────────────────────────────

const STORAGE_KEY = "track";

/**
 * Resolves the active track from the URL's first segment. On trackless routes
 * (e.g. /posts) it falls back to the last track the visitor used, then to the
 * default. Initialized to DEFAULT_TRACK on the server to avoid a hydration
 * mismatch, then reconciled on the client.
 */
export const useCurrentTrack = (): TrackId => {
  const router = useRouter();
  const fromPath = router.asPath.split("/")[1];
  const urlTrack = isTrackId(fromPath) ? fromPath : undefined;

  const [track, setTrack] = useState<TrackId>(urlTrack ?? DEFAULT_TRACK);

  useEffect(() => {
    if (urlTrack) {
      setTrack(urlTrack);
      try {
        window.localStorage.setItem(STORAGE_KEY, urlTrack);
      } catch {}
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isTrackId(stored ?? undefined)) setTrack(stored as TrackId);
    } catch {}
  }, [urlTrack]);

  return track;
};

export const rememberTrack = (t: TrackId) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, t);
  } catch {}
};
