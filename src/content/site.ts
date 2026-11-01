/**
 * Shared identity, links and metadata. Everything that must stay consistent
 * across /, /software and /ai lives here.
 */

export const SITE_URL = "https://aklamaash.me";

export const PERSON = {
  name: "Mohamed Aklamaash",
  /** Name used in casual copy. */
  shortName: "Aklamaash",
  /** Full legal-style name as it appears on the resume. */
  fullName: "Mohamed Aklamaash M.R",
  location: "Coimbatore, Tamil Nadu, India",
  email: "aklamaash78@gmail.com",
  image: "/me.png",
  github: "https://github.com/MohamedAklamaash",
  githubHandle: "MohamedAklamaash",
  linkedin: "https://www.linkedin.com/in/aklamaash/",
  linkedinHandle: "aklamaash",
  /** One line shown in footers and structured data. */
  jobTitle: "Software Engineer",
} as const;

export const EDUCATION = {
  school: "PSG College of Technology",
  schoolUrl: "https://www.psgtech.edu",
  place: "Coimbatore, India",
  degree: "M.Sc. (Integrated) Data Science",
  dates: "Aug 2022 – May 2027 (expected)",
  graduation: "May 2027",
} as const;

export const RESUMES = {
  software: {
    href: "/Aklamaash_Resume_SDE.pdf",
    label: "Software Engineering resume",
  },
  ai: {
    href: "/Aklamaash_Resume_AI.pdf",
    label: "AI and ML resume",
  },
} as const;

export const TALE_URL = "https://app.aklamaash.me";

export type ProfileId = "software" | "ai";

export const PROFILE_PATHS: Record<ProfileId, string> = {
  software: "/software",
  ai: "/ai",
};

export const PROFILE_LABELS: Record<ProfileId, string> = {
  software: "Software Engineering",
  ai: "AI and Machine Learning",
};

/** Short labels for the navigation bar. */
export const PROFILE_NAV_LABELS: Record<ProfileId, string> = {
  software: "Software",
  ai: "AI & ML",
};

export const absoluteUrl = (path: string) =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;
