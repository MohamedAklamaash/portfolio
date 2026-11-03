/**
 * Professional experience. Shared by every page so the two profiles never
 * drift apart. Wording follows the two resumes in /public.
 */

export interface Role {
  title: string;
  dates: string;
  /** ISO dates for structured data and <time>. */
  start: string;
  end: string;
  points: string[];
  stack: string[];
}

export interface Employer {
  company: string;
  note: string;
  url: string;
  location: string;
  summary: string;
  roles: Role[];
}

export const EXPERIENCE: Employer[] = [
  {
    company: "Unbound Security",
    note: "YC S24",
    url: "https://getunbound.ai/",
    location: "Remote / Bengaluru",
    summary:
      "Unbound builds a security platform that helps companies control how their employees and AI agents use AI tools. I interned there twice and worked on the backend, the cloud setup and the systems that detect sensitive data.",
    roles: [
      {
        title: "Software Engineering Intern (Summer)",
        dates: "May 2026 – Jun 2026",
        start: "2026-05",
        end: "2026-06",
        points: [
          "Added detection for passwords, API keys and other secrets to the platform using TruffleHog. In testing it caught 97% of real secrets (94% F1). I then cut down the false alarms that security teams had been complaining about.",
          "Found and fixed a bug where some security policies were quietly not being applied, because different parts of the system used different names for the same field.",
          "Made it possible for large customers to run the whole product inside their own cloud account. This used Kubernetes on AWS (EKS) with Helm and ArgoCD for deployments, Authentik for single sign-on. Prometheus and Grafana handle the monitoring.",
        ],
        stack: [
          "Go",
          "Python",
          "TruffleHog",
          "Amazon EKS",
          "Helm",
          "ArgoCD",
          "Authentik",
          "Prometheus",
          "Grafana",
        ],
      },
      {
        title: "Software Engineering Intern",
        dates: "May 2025 – Dec 2025",
        start: "2025-05",
        end: "2025-12",
        points: [
          "Moved the company's product, with all its services, from Google Cloud to AWS. This cut infrastructure costs by up to 20% without making anything slower or less reliable.",
          "Rebuilt the billing system so customers can be charged by invoice or by how much they use, and looked after it from design to launch.",
          "Improved the system that spots sensitive data, taking its accuracy above 90%.",
          "Built a fast notification service for real-time updates, and dashboards that show companies how their AI tools and agents are being used.",
        ],
        stack: ["Python", "Django", "AWS", "GCP", "Docker", "Kubernetes"],
      },
    ],
  },
];
