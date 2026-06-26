const COLOR = {
  BLUE: "#60a5fa",
  ORANGE: "#fdba74",
  GREEN: "#86efac",
  RED: "#fca5a5",
  VIOLET: "a78bfa",
  YELLOW: "#facc15",
  PINK: "#f472b6",
  CYAN: "#22d3ee",
};
export const TECH_STACK: { [key: string]: techStack } = {
  REACT: { title: "React", color: COLOR.BLUE },
  NEXTJS: { title: "NextJS", color: COLOR.ORANGE },
  MONGODB: { title: "MongoDB", color: COLOR.GREEN },
  NODEJS: { title: "NodeJS", color: COLOR.RED },
  EXPRESS: { title: "Express", color: COLOR.YELLOW },
  POSTGRESQL: { title: "PostgreSQL", color: COLOR.PINK },
  EXPO: { title: "Expo", color: COLOR.VIOLET },
  REACT_NATIVE: { title: "React Native", color: COLOR.CYAN },
  MYSQL: { title: "MySQL", color: COLOR.PINK },
  PRISMA: { title: "Prisma", color: COLOR.GREEN },
  FIREBASE: { title: "Firebase", color: COLOR.GREEN },
  GEMINI: { title: "Gemini", color: COLOR.BLUE },
  PUSHER: { title: "Pusher", color: COLOR.VIOLET },
  REDIS: { title: "Redis", color: COLOR.RED },
  PYTHON: { title: "Python", color: COLOR.BLUE },
  DJANGO: { title: "Django", color: COLOR.GREEN },
  GO: { title: "Go", color: COLOR.CYAN },
  KUBERNETES: { title: "Kubernetes", color: COLOR.VIOLET },
  DOCKER: { title: "Docker", color: COLOR.BLUE },
  SKAFFOLD: { title: "Skaffold", color: COLOR.BLUE },
  NGINX: { title: "Nginx", color: COLOR.GREEN },
  AWS: { title: "AWS", color: COLOR.ORANGE },
  TENSORFLOW: { title: "TensorFlow", color: COLOR.ORANGE },
  NESTJS: { title: "NestJS", color: COLOR.RED },
  TYPESCRIPT: { title: "TypeScript", color: COLOR.BLUE },
  DEEP_LEARNING: { title: "Deep Learning", color: COLOR.VIOLET },
  RABBITMQ: { title: "RabbitMQ", color: COLOR.ORANGE },
  CELERY: { title: "Celery", color: COLOR.GREEN },
  MICROSERVICES: { title: "Microservices", color: COLOR.CYAN },
  SAGA: { title: "Saga", color: COLOR.PINK },
  NETWORKS: { title: "Networks", color: COLOR.BLUE },
  FTP: { title: "FTP", color: COLOR.YELLOW },
  OCR: { title: "OCR", color: COLOR.CYAN },
  DLP: { title: "DLP", color: COLOR.RED },
  ML: { title: "ML", color: COLOR.VIOLET },
  RAG: { title: "RAG", color: COLOR.GREEN },
  RL: { title: "RL", color: COLOR.ORANGE },
  NLP: { title: "NLP", color: COLOR.CYAN },
  FINETUNING: { title: "Fine-tuning", color: COLOR.PINK },
  WEBRTC: { title: "WebRTC", color: COLOR.BLUE },
  SOCKETIO: { title: "Socket.io", color: COLOR.GREEN },
  TERRAFORM: { title: "Terraform", color: COLOR.VIOLET },
  ECS: { title: "ECS Fargate", color: COLOR.ORANGE },
  CODEBUILD: { title: "CodeBuild", color: COLOR.ORANGE },
  LLM: { title: "LLMs", color: COLOR.VIOLET },
  PYTORCH: { title: "PyTorch", color: COLOR.ORANGE },
  TRANSFORMERS: { title: "Transformers", color: COLOR.VIOLET },
  EVAL: { title: "Evaluation", color: COLOR.CYAN },
  AI_SAFETY: { title: "AI Safety", color: COLOR.RED },
  PPO: { title: "PPO", color: COLOR.ORANGE },
  FASTAPI: { title: "FastAPI", color: COLOR.GREEN },
  EMBEDDINGS: { title: "Embeddings", color: COLOR.BLUE },
  MULTI_AGENT: { title: "Multi-agent", color: COLOR.PINK },
  ALGORITHMS: { title: "Algorithms", color: COLOR.YELLOW },
};

interface techStack {
  title: string;
  color: string;
}

export type ProjectTrack = "research" | "software";

export interface Project {
  title: string;
  description: string;
  techStack: techStack[];
  githubLink?: string;
  deployedLink?: string;
  imageSrc?: string;
  isFeatured: boolean;
  shortDescription: string;
  track: ProjectTrack;
  metric?: string;
}
export const PROJECTS_DATA: Project[] = [
  {
    title: "redharness",
    track: "research",
    metric: "3 threat surfaces · hash-pinned datasets · per-result provenance",
    shortDescription:
      "A standardized, reproducible benchmark for LLM adversarial robustness across jailbreak, prompt-injection, and data-leakage — one methodology, versioned datasets, and a (dataset, judge, metric) provenance triple on every result.",
    description:
      "An open-source evaluation framework that unifies three LLM threat surfaces—jailbreak, prompt injection, and data leakage—under a single pluggable methodology with a strict reproducibility contract. Hash-pinned datasets, deterministic seeded execution, persisted transcripts, and a (dataset_version, judge, metric) provenance triple recorded for every reported number. Includes a judge-sensitivity study and an offline-deterministic core with opt-in live model evaluation.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.LLM,
      TECH_STACK.AI_SAFETY,
      TECH_STACK.EVAL,
      TECH_STACK.NLP,
    ],
    githubLink: "https://github.com/MohamedAklamaash/redharness",
    deployedLink: "https://pypi.org/project/redharness/",
    imageSrc: "/projects/redharness.svg",
    isFeatured: true,
  },
  {
    title: "nanocoder-math",
    track: "research",
    metric: "Muon vs AdamW: 645→539 val PPL · 83.2% single-digit arithmetic",
    shortDescription:
      "A decoder-only GPT trained from scratch for code & math under single-device compute — custom 16k BPE tokenizer, streaming data pipeline, and controlled ablations on optimizer, data, and architecture (MPS/CUDA).",
    description:
      "A from-scratch decoder-only language model studying how much capability a small model can acquire when the entire pipeline—tokenizer, data, architecture, optimizer, and evaluation—must run on one machine. Implements a complete GPT-style training stack in plain PyTorch with a single hardware-abstraction layer (Apple MPS, CUDA, CPU). Controlled ablations isolate each lever: replacing AdamW with Muon lowered validation perplexity 645→539 at equal token budget, and a formally-verified arithmetic corpus reached 83.2% exact-match on single-digit problems.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.PYTORCH,
      TECH_STACK.TRANSFORMERS,
      TECH_STACK.DEEP_LEARNING,
      TECH_STACK.LLM,
    ],
    githubLink: "https://github.com/MohamedAklamaash/nanocoder-math",
    deployedLink: undefined,
    imageSrc: "/projects/nanocoder-math.svg",
    isFeatured: true,
  },
  {
    title: "RAMPART",
    track: "research",
    metric: "Evaluation-first · posterior-blended coordination vs 1/N baseline",
    shortDescription:
      "Regime-aware multi-agent portfolio allocation — a supervisor routes capital across specialist strategies under deterministic risk guardrails, every decision scored with purged walk-forward backtests. Research/simulation only.",
    description:
      "A coordination-first portfolio system, built evaluation-first and reported honestly. A regime-aware supervisor dispatches specialist strategies (RL + deterministic policies) constrained by deterministic risk guardrails, while a separate natural-language layer handles goal parsing and grounded explanation without ever touching allocations. Every component—including the coordinator—is scored with a purged walk-forward backtest against honest benchmarks; results (where posterior blending beats 1/N and where it doesn't) are reported without spin. Research and simulation only.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.RL,
      TECH_STACK.PPO,
      TECH_STACK.MULTI_AGENT,
      TECH_STACK.FASTAPI,
      TECH_STACK.REACT,
    ],
    githubLink: "https://github.com/MohamedAklamaash/RAMPART",
    deployedLink: undefined,
    imageSrc: "/projects/rampart.svg",
    isFeatured: true,
  },
  {
    title: "Launchpad",
    track: "software",
    shortDescription: "Self-hosted deployment platform that turns a GitHub repo into a running ECS service in your own AWS account—no shared infra, no vendor lock-in.",
    description:
      "A cloud deployment control plane that provisions isolated VPCs, ECS clusters, ALBs, and ECR registries inside the user's own AWS account via Terraform. Handles the full 11-step deployment pipeline: CodeBuild image build, task definition, ALB path-based routing, and ECS service stability—all async via Redis queues and RabbitMQ events.",
    techStack: [
      TECH_STACK.AWS,
      TECH_STACK.TERRAFORM,
      TECH_STACK.RABBITMQ,
      TECH_STACK.DJANGO,
      TECH_STACK.DOCKER,
      TECH_STACK.REDIS,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.PYTHON,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.REACT,
    ],
    githubLink: "https://github.com/MohamedAklamaash/launchpad",
    deployedLink: "https://launchpad-five-lilac.vercel.app",
    imageSrc: "/projects/launchpad.png",
    isFeatured: true,
  },
  {
    title: "codegraph",
    track: "software",
    metric: "AST + call-tracing + embeddings · semantic search across 8 languages",
    shortDescription:
      "Turns any GitHub repository into an interactive code knowledge graph — parses source, traces function calls, builds embeddings, and answers natural-language questions about the architecture.",
    description:
      "Takes a GitHub repository URL and turns its codebase into an interactive visual graph: every function is a node and every call an edge. Parses source across Python, JS/TS, Go, Rust, Java, C/C++, and Kotlin, builds embeddings for semantic search, and supports plain-language questions about where logic lives. Dockerized backend with directory/file filtering and per-function inspection.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.FASTAPI,
      TECH_STACK.EMBEDDINGS,
      TECH_STACK.LLM,
      TECH_STACK.REACT,
      TECH_STACK.DOCKER,
    ],
    githubLink: "https://github.com/MohamedAklamaash/codegraph",
    deployedLink: undefined,
    imageSrc: "/projects/codegraph.png",
    isFeatured: false,
  },
  {
    title: "syncset-db",
    track: "software",
    shortDescription: "Python library for selective PostgreSQL table/column replication with schema drift detection and crash-safe sync.",
    description: "Designed and implemented a high-performance replication service for PostgreSQL that enables selective synchronization of database subsets. Features automated schema evolution, crash-safe replication, and drift detection to ensure data consistency across distributed systems.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.DOCKER,
    ],
    githubLink: "https://github.com/MohamedAklamaash/syncset",
    deployedLink: "https://pypi.org/project/syncset-db/",
    imageSrc: "/projects/syncset.svg",
    isFeatured: false,
  },
  {
    title: "patternix",
    track: "research",
    metric: "Reservoir sampling · sliding-window & decayed top-k mining",
    shortDescription:
      "Reservoir-based frequent-pattern mining for data streams — top-k maintenance under non-decayed, sliding-window, and exponential-decay settings.",
    description:
      "An implementation of reservoir-based pattern mining for data streams, with support for top-k maintenance under non-decayed, sliding-window, and exponential-decay regimes. A study in streaming algorithms: bounded-memory sampling and incremental statistics over unbounded input.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.ALGORITHMS,
    ],
    githubLink: "https://github.com/MohamedAklamaash/patternix",
    deployedLink: undefined,
    imageSrc: "/projects/patternix.svg",
    isFeatured: false,
  },
  {
    title: "Voice Opinion",
    track: "software",
    shortDescription: "Real-time audio/video rooms with WebRTC peer connections, room visibility controls, in-room chat, and friend-based invite system.",
    description:
      "A full-stack real-time collaboration platform built with React, Node.js, and Socket.io. Supports public, social, and private rooms with WebRTC peer-to-peer audio/video, Google Meet-style pinnable video grid, WhatsApp-style in-room chat with 200-message history, friend requests, and email OTP auth.",
    techStack: [
      TECH_STACK.REACT,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.NODEJS,
      TECH_STACK.WEBRTC,
      TECH_STACK.SOCKETIO,
      TECH_STACK.MONGODB,
    ],
    githubLink: "https://github.com/MohamedAklamaash/voice-opinion",
    deployedLink: undefined,
    imageSrc: "/projects/voice-opinion.png",
    isFeatured: false,
  },
  {
    title: "MANAGE_MONEY",
    track: "software",
    shortDescription: "Personal finance dashboard with GPT-4 receipt OCR, budget tracking, and transaction categorisation.",
    description:
      "Architected a financial analytics platform using Next.js and PostgreSQL. Integrated GPT-4 for automated OCR receipt parsing and intelligent budget recommendations, deployed via Docker for consistent environments.",
    techStack: [
      TECH_STACK.NEXTJS,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.PRISMA,
      TECH_STACK.GEMINI,
    ],
    githubLink: "https://github.com/MohamedAklamaash/ManageMoneyWithAI",
    deployedLink: "https://manage-money-with-ai.vercel.app/",
    imageSrc: "/projects/managemoney.png",
    isFeatured: false,
  },
  {
    title: "SmartScreenshot",
    track: "research",
    shortDescription: "OCR pipeline that detects and masks API keys, passwords, and sensitive text in screenshots before they leak.",
    description:
      "OCR-based sensitive content detection system that identifies and masks API keys, passwords, and confidential text in screenshots. Features batch-processing pipelines for high-volume screenshot ingestion, ensuring scalability and reliability for security-critical operations.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.OCR,
      TECH_STACK.DLP,
      TECH_STACK.ML,
    ],
    githubLink: "https://github.com/luqmaan-k/SmartScreenshot",
    deployedLink: undefined,
    imageSrc: "/projects/smartscreenshot.png",
    isFeatured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS_DATA.filter(
  (project) => project.isFeatured,
);
