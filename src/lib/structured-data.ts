import { EXPERIENCE } from "@/content/experience";
import type { Project } from "@/content/projects";
import { EDUCATION, PERSON, SITE_URL, absoluteUrl } from "@/content/site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON.name,
  alternateName: [PERSON.shortName, PERSON.fullName],
  url: SITE_URL,
  image: absoluteUrl(PERSON.image),
  email: `mailto:${PERSON.email}`,
  jobTitle: PERSON.jobTitle,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  nationality: { "@type": "Country", name: "India" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: EDUCATION.school,
    url: EDUCATION.schoolUrl,
  },
  affiliation: EXPERIENCE.map((e) => ({
    "@type": "Organization",
    name: e.company,
    url: e.url,
  })),
  knowsAbout: [
    "Software engineering",
    "Backend engineering",
    "Distributed systems",
    "Cloud infrastructure",
    "Amazon Web Services",
    "Kubernetes",
    "Machine learning",
    "Information retrieval",
    "Natural language processing",
    "LLM evaluation",
    "Data science",
  ],
  sameAs: [PERSON.github, PERSON.linkedin],
});

const websiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: PERSON.name,
  inLanguage: "en-IN",
  publisher: { "@id": PERSON_ID },
});

export const homeGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    websiteNode(),
    personSchema(),
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: PERSON.name,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
});

export const profilePageSchema = (opts: {
  path: string;
  name: string;
  description: string;
  projects: Project[];
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    personSchema(),
    {
      "@type": "ProfilePage",
      "@id": `${absoluteUrl(opts.path)}#profilepage`,
      url: absoluteUrl(opts.path),
      name: opts.name,
      description: opts.description,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      hasPart: opts.projects.map((p) => projectSchema(p)),
    },
  ],
});

export const projectSchema = (p: Project) => {
  const repo = p.links.find((l) => l.href.startsWith("https://github.com"));
  return {
    "@type": repo ? "SoftwareSourceCode" : "CreativeWork",
    name: p.name,
    description: p.summary,
    ...(p.caseStudy ? { url: absoluteUrl(`/projects/${p.slug}`) } : {}),
    ...(repo ? { codeRepository: repo.href } : {}),
    keywords: p.stack.join(", "),
    author: { "@id": PERSON_ID },
  };
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const articleSchema = (a: {
  title: string;
  description: string;
  path: string;
  date: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.description,
  url: absoluteUrl(a.path),
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.date,
  author: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    url: SITE_URL,
  },
  publisher: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name },
  inLanguage: "en-IN",
});
