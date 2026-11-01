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
      "Unbound builds a security platform that helps companies control how their employees and AI agents use AI tools. I interned there twice and worked across the backend, the cloud setup and the detection pipelines.",
    roles: [
      {
        title: "Software Engineering Intern (Summer)",
        dates: "May 2026 – Jun 2026",
        start: "2026-05",
        end: "2026-06",
        points: [
          "Added secrets and DLP scanning to the platform using TruffleHog and tuned it to 97% recall and 94% F1. I then went after false positives, which security teams had been complaining about, and cut the alert noise down.",
          "Tracked down a field-name mismatch in a classifier (path vs files vs paths) that was silently skipping policy checks, and closed the gap.",
          "Shipped bring-your-own-cloud (BYOC) deployment so enterprise customers can run the product inside their own cloud: Amazon EKS with Helm and ArgoCD for GitOps, Authentik for SSO, plus Prometheus and Grafana for monitoring.",
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
          "Moved the core product from GCP to AWS across its microservices. Infrastructure cost came down by up to 20% without hurting reliability or performance.",
          "Rebuilt the billing system to support invoice-based and usage-metered pricing, and owned it from design through to production.",
          "Improved the DLP detection pipelines to over 90% classification accuracy.",
          "Built a low-latency notification service for real-time updates. I also built analytics for AI usage governance so organisations could see how every AI agent was being used.",
        ],
        stack: ["Python", "Django", "AWS", "GCP", "Docker", "Kubernetes"],
      },
    ],
  },
];
