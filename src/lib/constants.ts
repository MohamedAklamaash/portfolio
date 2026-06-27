import { IoIosMail, IoIosPaper } from "react-icons/io";
import { SiGithub, SiLinkedin } from "react-icons/si";

export const SOCIAL_IDS = {
  github: "MohamedAklamaash",
  linkedin: "aklamaash",
  email: "aklamaash78@gmail.com",
  instagram: "__aklamaash__",
} as const;

export const SOCIALS = {
  github: `https://github.com/${SOCIAL_IDS.github}`,
  linkedin: `https://www.linkedin.com/in/${SOCIAL_IDS.linkedin}/`,
  email: `https://mail.google.com/mail/u/0/?fs=1&to=${SOCIAL_IDS.email}&su=Hello!&tf=cm`,
  instagram: `https://www.instagram.com/${SOCIAL_IDS.instagram}/`,
} as const;

const LINKEDIN_DETAILS = {
  icon: SiLinkedin,
  title: "LinkedIn",
  link: SOCIALS.linkedin,
} as const;

const EMAIL_DETAILS = {
  icon: IoIosMail,
  tw: "h-5 w-5",
  title: "Email",
  link: SOCIALS.email,
};

interface LinkElement {
  icon: any;
  title: string;
  link: string;
  tw?: string;
}

export const CONTACT_LINK_ELEMENTS: LinkElement[] = [
  LINKEDIN_DETAILS,
  EMAIL_DETAILS,
];

export const HERO_LINK_ELEMENTS: LinkElement[] = [
  {
    icon: SiGithub,
    title: "Github",
    link: SOCIALS.github,
  },
  LINKEDIN_DETAILS,
  EMAIL_DETAILS,
  {
    icon: IoIosPaper,
    title: "Resume",
    link: "/resume.pdf",
  },
];

type ExpTrack = "software" | "ai-ml" | "both";

interface ExperienceBullet {
  text: string;
  track: ExpTrack;
}

interface ExperienceItem {
  company: string;
  link?: string;
  location?: string;
  role: string;
  duration: string;
  description: ExperienceBullet[];
  technologies: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Unbound Security",
    link: "https://getunbound.ai/",
    location: "Remote / Bengaluru",
    role: "AI / Software Engineering Intern (Summer)",
    duration: "May 2026 - Jun 2026",
    description: [
      {
        text: "Built secrets-detection (DLP) scanning into the enterprise AI-security platform with TruffleHog, reaching 97% recall and 94% F1, and drove a false-positive-reduction effort that cut alert noise for security teams.",
        track: "both",
      },
      {
        text: "Fixed a classifier field-name inconsistency (path / files / paths) that was causing silent policy misses, closing a coverage gap in DLP and policy enforcement.",
        track: "both",
      },
      {
        text: "Integrated Authentik (SSO/IdP) into the authentication flow to support enterprise on-prem / customer-cloud (BYOC) deployments, and instrumented services with Prometheus and Grafana for production observability.",
        track: "both",
      },
    ],
    technologies: ["TruffleHog", "Go", "Authentik", "Amazon EKS", "Prometheus", "Grafana", "Python"],
  },
  {
    company: "Unbound Security",
    link: "https://getunbound.ai/",
    location: "Bengaluru",
    role: "Software Engineering Intern",
    duration: "May 2025 - Dec 2025",
    description: [
      {
        text: "Migrated the core product from GCP to AWS, resulting in up to 20% cost reduction while maintaining performance and reliability.",
        track: "software",
      },
      {
        text: "Revamped the billing system to support invoice-based billing along with per-usage policies.",
        track: "software",
      },
      {
        text: "Enhanced DLP pipelines to improve data security increasing accuracy over 90%.",
        track: "ai-ml",
      },
      {
        text: "Built a low-latency Notification Service to deliver real-time updates efficiently.",
        track: "software",
      },
      {
        text: "Improved analytics for AI usage governance, enabling better visibility, control, and compliance across AI systems.",
        track: "ai-ml",
      },
    ],
    technologies: ["Python", "Django", "AWS", "GCP", "Docker", "Kubernetes"],
  },
];
