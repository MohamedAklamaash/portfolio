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

export const EXPERIENCE = [
  {
    company: "Unbound Security",
    role: "Software Engineering Intern",
    duration: "May 2025 - Dec 2025",
    description: "Worked at the intersection of data, engineering, and AI for a YC S24 backed security startup. Migrated infrastructure from GCP to AWS (15% cost reduction), optimized secrets detection pipeline, built SQL editor in Django admin, and designed AI prompt analysis system using MD5 hashing.",
    technologies: ["Python", "Django", "AWS", "GCP", "Docker", "Kubernetes"],
  },
];
