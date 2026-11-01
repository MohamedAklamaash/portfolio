import type { ProfileId } from "./site";
import { TALE_URL } from "./site";

/**
 * Page copy for the homepage and the two profiles. CONTENT.md mirrors this
 * file for easy review. If you change one, change the other.
 */

export interface SkillGroup {
  title: string;
  items: string[];
  /** Where these were actually used. Keeps the list honest. */
  usedIn: string;
}

export interface Profile {
  id: ProfileId;
  seo: { title: string; description: string };
  eyebrow: string;
  heading: string;
  intro: string[];
  lookingFor: string;
  /** Short bullets: what this profile is about. */
  focus: string[];
  projectsHeading: string;
  projectsIntro: string;
  experienceIntro: string;
  skills: SkillGroup[];
  /** Line pointing at the other profile. */
  crossLink: string;
}

// ─────────────────────────────── Home ───────────────────────────────

export const HOME = {
  seo: {
    title: "Mohamed Aklamaash: Software Engineer, Backend and AI",
    description:
      "Mohamed Aklamaash (Aklamaash) is a software engineer from India working on backend systems, cloud infrastructure, machine learning and information retrieval. Final-year M.Sc. Data Science at PSG Tech.",
  },
  greeting: "Hey, I'm Aklamaash.",
  intro: [
    "I'm a software engineer from India. I like building things and figuring out how they work underneath. Most of my work so far has been on backend systems and cloud infrastructure, with a good amount of machine learning and information retrieval alongside.",
    "The problems I enjoy most are the ones that make me slow down and think. Designing a backend that still behaves when a worker dies halfway through a job. Working out why a retrieval step keeps returning the wrong context. Getting an application to run reliably in the cloud without the bill getting silly.",
    "I'm in the final year of an integrated M.Sc. in Data Science at PSG College of Technology, and I've spent about a year as an intern at Unbound Security. Here's a bit more about what I've been working on.",
  ],
  paths: {
    software: {
      title: "Software Engineering",
      description:
        "Backend engineering, distributed systems, cloud infrastructure and full-stack work.",
      examples: "Tale Analytics, Launchpad, relay",
    },
    ai: {
      title: "AI and Machine Learning",
      description:
        "Machine learning, information retrieval, LLM evaluation and research-style projects.",
      examples: "redharness, nanocoder-math, codegraph",
    },
  } satisfies Record<
    ProfileId,
    { title: string; description: string; examples: string }
  >,
  now: [
    {
      label: "Building",
      text: "Tale Analytics, a financial analytics product.",
      href: TALE_URL,
    },
    {
      label: "Studying",
      text: "Final year of an integrated M.Sc. in Data Science, finishing in May 2027.",
    },
    {
      label: "Looking for",
      text: "Software engineering and AI engineering roles.",
    },
  ],
};

// ─────────────────────────── Tale Analytics ───────────────────────────

export const TALE = {
  name: "Tale Analytics",
  kind: "Product I'm building",
  status: "In development",
  url: TALE_URL,
  urlLabel: "app.aklamaash.me",
  summary:
    "Tale Analytics is a financial analytics product I'm working on. It brings a company's financial data and accounting workflows into one place, with features for reconciliation, reporting and the month-end close.",
  detail:
    "It's the first thing I've built that is meant for real users rather than as a project, so most of my time goes into the unglamorous parts: getting data in correctly, keeping numbers consistent and making the workflows feel obvious. I'll write up the engineering side properly once it's further along.",
};

// ─────────────────────────────── Profiles ───────────────────────────────

export const PROFILES: Record<ProfileId, Profile> = {
  software: {
    id: "software",
    seo: {
      title: "Software Engineer: Backend and Cloud Infrastructure",
      description:
        "Software engineering profile of Mohamed Aklamaash: backend engineering, distributed systems and AWS cloud infrastructure. GCP to AWS migration and billing at Unbound Security (YC S24), plus Launchpad, relay and Tale Analytics.",
    },
    eyebrow: "Software Engineering",
    heading: "Backend systems, infrastructure and the products on top of them.",
    intro: [
      "I mostly work on backends and the infrastructure they run on. At Unbound Security I moved the core product from GCP to AWS, rebuilt the billing system and later shipped a way for enterprise customers to run the product inside their own cloud on Kubernetes.",
      "Outside work I keep building the same kind of thing for myself: a deployment platform that runs inside your own AWS account, a Redis-backed job queue in Go and a small Postgres replication tool. I'm also building Tale Analytics, a financial analytics product.",
      "I like system design and distributed systems because the difficult part is rarely the happy path. Most of the interesting decisions come from asking what happens when a worker crashes halfway, a credential expires in the middle of a deploy or a schema changes underneath you.",
    ],
    lookingFor:
      "Open to software engineer, backend, platform and infrastructure roles.",
    focus: [
      "Backend services and APIs",
      "Distributed systems and queues",
      "AWS, Kubernetes and Terraform",
      "Databases and data movement",
    ],
    projectsHeading: "Selected work",
    projectsIntro:
      "A product I'm building, and three projects I'd be happy to walk through in an interview.",
    experienceIntro:
      "About a year across two internships, mostly on cloud infrastructure, billing and security tooling.",
    skills: [
      {
        title: "Languages",
        items: ["Python", "Go", "TypeScript", "Java", "C++", "SQL"],
        usedIn:
          "Python and Go at Unbound; Go for relay; TypeScript for front ends",
      },
      {
        title: "Backend",
        items: [
          "Django",
          "FastAPI",
          "Node.js",
          "REST APIs",
          "Microservices",
          "Server-Sent Events",
        ],
        usedIn: "Unbound, Launchpad, codegraph",
      },
      {
        title: "Cloud and infrastructure",
        items: [
          "AWS (ECS, EKS, ALB, CodeBuild, ECR)",
          "GCP",
          "Docker",
          "Kubernetes",
          "Terraform",
          "Helm",
          "ArgoCD",
          "NGINX",
        ],
        usedIn: "GCP to AWS migration and BYOC on EKS at Unbound; Launchpad",
      },
      {
        title: "Data and messaging",
        items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Kafka"],
        usedIn: "Launchpad, relay, syncset-db",
      },
      {
        title: "Observability",
        items: ["Prometheus", "Grafana", "CloudWatch"],
        usedIn: "Monitoring for BYOC at Unbound; relay metrics; Launchpad logs",
      },
    ],
    crossLink:
      "I also work on machine learning, LLM evaluation and retrieval. That work is on a separate page.",
  },

  ai: {
    id: "ai",
    seo: {
      title: "AI and Machine Learning: Evaluation and Retrieval",
      description:
        "AI and machine learning profile of Mohamed Aklamaash: LLM robustness evaluation (redharness), a GPT trained from scratch, retrieval over code, applied ML and a Data Science background. Open to AI engineer and ML engineer roles.",
    },
    eyebrow: "AI and Machine Learning",
    heading: "Evaluation, retrieval and models I've trained myself.",
    intro: [
      "My degree is an integrated M.Sc. in Data Science, so statistics and machine learning are where I started. The parts I keep coming back to now are evaluation and retrieval: how you measure what a model is actually doing, and how you find the right context to give it in the first place.",
      "Most of my AI work is in my own projects. I built redharness, a benchmark for LLM robustness, after noticing that the same attack could score very differently depending on who graded it. I trained a small GPT from scratch on a laptop to see what each part of the training stack really does. codegraph is my attempt at retrieval over source code, where vector search on its own wasn't enough.",
      "At Unbound Security I worked on the detection side of an AI security product: secrets and DLP scanning, plus analytics on how AI agents were being used across an organisation. I'm not a published researcher, but I try to work like one where it counts: fixed baselines, seeded runs and writing down the results that didn't go my way.",
    ],
    lookingFor:
      "Open to AI engineer, ML engineer and applied AI roles, especially ones that involve evaluation or retrieval.",
    focus: [
      "LLM evaluation and safety",
      "Information retrieval and RAG",
      "Training and ablating small models",
      "Experiment design",
    ],
    projectsHeading: "Selected projects",
    projectsIntro:
      "Each project lists the question, what I measured and where it falls short. Numbers come from the repositories.",
    experienceIntro:
      "Two internships at an AI security company, including detection work on secrets and sensitive data.",
    skills: [
      {
        title: "Deep learning",
        items: [
          "PyTorch",
          "Decoder-only Transformers",
          "BPE tokenisation",
          "AdamW and Muon",
          "Mixed precision",
        ],
        usedIn: "nanocoder-math",
      },
      {
        title: "LLM evaluation and safety",
        items: [
          "Benchmark design",
          "LLM-as-judge",
          "Judge agreement (Cohen's κ)",
          "Jailbreak and prompt-injection testing",
          "DLP and secrets detection",
        ],
        usedIn: "redharness; DLP at Unbound",
      },
      {
        title: "Retrieval",
        items: [
          "Dense embeddings",
          "pgvector",
          "Graph-expanded retrieval",
          "Grounded generation",
        ],
        usedIn: "codegraph",
      },
      {
        title: "Reinforcement learning",
        items: [
          "PPO (Stable-Baselines3)",
          "GRPO with verifiable rewards",
          "Gymnasium environments",
        ],
        usedIn: "RAMPART, nanocoder-math",
      },
      {
        title: "Data science",
        items: [
          "NumPy",
          "pandas",
          "scikit-learn",
          "Walk-forward backtesting",
          "Streaming algorithms",
        ],
        usedIn: "RAMPART, patternix, coursework",
      },
      {
        title: "LLM APIs and tooling",
        items: ["OpenAI", "Anthropic", "Gemini", "FastAPI", "Streamlit"],
        usedIn: "redharness, codegraph, RAMPART",
      },
    ],
    crossLink:
      "Most of my professional work has been backend and infrastructure. That's on the software engineering page.",
  },
};
