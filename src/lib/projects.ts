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
};

interface techStack {
  title: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: techStack[];
  githubLink?: string;
  deployedLink?: string;
  imageSrc: string;
  isFeatured: boolean;
  shortDescription: string;
}
export const PROJECTS_DATA: Project[] = [
  {
    title: "Launchpad",
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
    title: "PortfolioGPT-RL",
    shortDescription: "PPO-trained RL agent for Indian equity portfolio allocation, with LangChain-powered reasoning explaining every decision.",
    description:
      "Multi-agent reinforcement learning system for autonomous portfolio management. A PPO model trained on historical Indian equity data generates diversified allocations across stocks, indices, and commodities. LangChain + OpenAI produces natural language explanations for each allocation. Includes market regime detection, volatility signals, and momentum features.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.RL,
      TECH_STACK.RAG,
      TECH_STACK.REACT,
      TECH_STACK.TYPESCRIPT,
    ],
    githubLink: "https://github.com/MohamedAklamaash/PortfolioGPT-RL",
    deployedLink: undefined,
    imageSrc: "/projects/allocation.png",
    isFeatured: true,
  },
  {
    title: "syncset-db",
    shortDescription: "Python library for selective PostgreSQL table/column replication with schema drift detection and crash-safe sync.",
    description: "Designed and implemented a high-performance replication service for PostgreSQL that enables selective synchronization of database subsets. Features automated schema evolution, crash-safe replication, and drift detection to ensure data consistency across distributed systems.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.DOCKER,
    ],
    githubLink: "https://github.com/MohamedAklamaash/syncset",
    deployedLink: "https://pypi.org/project/syncset-db/",
    imageSrc: "/projects/syncset.png",
    isFeatured: true,
  },
  {
    title: "Voice Opinion",
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
    title: "PSG Tech Foundation Day",
    shortDescription: "Event management portal handling 100+ concurrent registrations with secure document uploads and NestJS/React stack.",
    description:
      "Delivered a full-stack event management solution for PSG Tech's Foundation Day. Handled secure document uploads and real-time registrations for 100+ participants using NestJS and React, orchestrated with Nginx.",
    techStack: [
      TECH_STACK.REACT,
      TECH_STACK.NESTJS,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.DOCKER,
      TECH_STACK.NGINX,
    ],
    githubLink: "https://github.com/MohamedAklamaash/alumni-nomination-frontend",
    deployedLink: "https://foundationday.psgtech.ac.in/",
    imageSrc: "/projects/psgfoundation.png",
    isFeatured: false,
  },
  {
    title: "SmartScreenshot",
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
  {
    title: "Friends",
    shortDescription: "Social feed app with user connections, post sharing, and real-time interactions built on React and MongoDB.",
    description:
      "Social media prototype where users can connect, share updates, and interact. Features user connections, update sharing, and a social networking environment built with modern web technologies.",
    techStack: [
      TECH_STACK.REACT,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.MONGODB,
    ],
    githubLink: "https://github.com/MohamedAklamaash/Friends",
    deployedLink: "https://friends-2.vercel.app/",
    imageSrc: "/projects/friends.png",
    isFeatured: false,
  },
  {
    title: "Alumni Meet",
    shortDescription: "Alumni networking and event registration platform with directory browsing and NestJS/PostgreSQL backend.",
    description:
      "Alumni networking and event management platform built with modern web technologies. Features event registration, alumni directory, and networking tools.",
    techStack: [
      TECH_STACK.REACT,
      TECH_STACK.NESTJS,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.POSTGRESQL,
    ],
    githubLink: undefined,
    deployedLink: "https://alumini-meet-frontend.vercel.app/",
    imageSrc: "/projects/alumnimeet.png",
    isFeatured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS_DATA.filter(
  (project) => project.isFeatured,
);
