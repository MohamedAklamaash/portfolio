import { TECH_STACK } from "./projects";

type SkillTrack = "software" | "ai-ml" | "both";

interface SkillCategory {
  title: string;
  track: SkillTrack;
  skills: { title: string; color: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI / ML Research",
    track: "ai-ml",
    skills: [
      TECH_STACK.PYTORCH,
      TECH_STACK.TRANSFORMERS,
      TECH_STACK.LLM,
      TECH_STACK.RL,
      TECH_STACK.PPO,
      TECH_STACK.EVAL,
      TECH_STACK.NLP,
      TECH_STACK.DEEP_LEARNING,
    ],
  },
  {
    title: "Applied AI",
    track: "ai-ml",
    skills: [
      TECH_STACK.RAG,
      TECH_STACK.EMBEDDINGS,
      TECH_STACK.AI_SAFETY,
      TECH_STACK.OCR,
    ],
  },
  {
    title: "Languages",
    track: "both",
    skills: [
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.PYTHON,
      TECH_STACK.GO,
    ],
  },
  {
    title: "Backend & Frameworks",
    track: "software",
    skills: [
      TECH_STACK.NODEJS,
      TECH_STACK.NESTJS,
      TECH_STACK.DJANGO,
      TECH_STACK.RABBITMQ,
      TECH_STACK.CELERY,
    ],
  },
  {
    title: "Frontend & Mobile",
    track: "software",
    skills: [
      TECH_STACK.REACT,
      TECH_STACK.NEXTJS,
    ],
  },
  {
    title: "Databases",
    track: "both",
    skills: [
      TECH_STACK.POSTGRESQL,
      TECH_STACK.MONGODB,
      TECH_STACK.REDIS,
    ],
  },
  {
    title: "Cloud & DevOps",
    track: "both",
    skills: [
      TECH_STACK.AWS,
      TECH_STACK.KUBERNETES,
      TECH_STACK.DOCKER,
      TECH_STACK.NGINX,
    ],
  },
];
