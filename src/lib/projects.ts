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
  SHEETS_API: { title: "Sheets API", color: COLOR.BLUE },
  FIREBASE: { title: "Firebase", color: COLOR.GREEN },
  GPT: { title: "GPT", color: COLOR.BLUE },
  PUSHER: { title: "Pusher", color: COLOR.VIOLET },
  REDIS: { title: "Redis", color: COLOR.RED },
  PYTHON: { title: "Python", color: COLOR.BLUE },
  DJANGO: { title: "Django", color: COLOR.GREEN },
  GO: { title: "Go", color: COLOR.CYAN },
  KUBERNETES: { title: "Kubernetes", color: COLOR.VIOLET },
  DOCKER: { title: "Docker", color: COLOR.BLUE },
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
    title: "MANAGE_MONEY",
    shortDescription: "AI-powered personal finance tracker with OCR and smart budgeting",
    description:
      "AI-driven personal finance tracker with OCR-based transaction parsing and AI-powered budgeting recommendations. Features expense tracking with categorization, budget management, AI insights, and investment opportunities exploration. Containerized with Docker for scalability.",
    techStack: [
      TECH_STACK.NEXTJS,
      TECH_STACK.POSTGRESQL,
      TECH_STACK.PRISMA,
      TECH_STACK.GPT,
    ],
    githubLink: "https://github.com/MohamedAklamaash/ManageMoneyWithAI",
    deployedLink: "https://manage-money-with-ai.vercel.app/",
    imageSrc: "/projects/managemoney.png",
    isFeatured: true,
  },
  {
    title: "SONIC_K8s",
    shortDescription: "Distributed Kubernetes video transcoding service with 40% faster processing",
    description:
      "Distributed Kubernetes transcoding service providing fault-tolerant video-to-audio transcription. Features automatic video-to-audio conversion, audio transcription to text, RabbitMQ for high-throughput message queuing, and dynamic autoscaling of worker pods. Achieved 40% reduction in average processing time.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.DJANGO,
      TECH_STACK.KUBERNETES,
      TECH_STACK.DOCKER,
      TECH_STACK.AWS,
      TECH_STACK.RABBITMQ,
      TECH_STACK.CELERY,
    ],
    githubLink: "https://github.com/MohamedAklamaash/SONIC_K8s",
    deployedLink: undefined,
    imageSrc: "/projects/sonic.png",
    isFeatured: true,
  },
  {
    title: "PSG Tech Foundation Day 2025",
    shortDescription: "Event management platform handling 100+ participants",
    description:
      "Full-stack platform for managing events on Foundation Day 2025. Features document uploads, event registration system, award nomination process, and automated validations and confirmations. Successfully handled 100+ participants.",
    techStack: [
      TECH_STACK.REACT,
      TECH_STACK.NESTJS,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.POSTGRESQL,
    ],
    githubLink: "https://github.com/MohamedAklamaash/alumni-nomination-frontend",
    deployedLink: "https://foundationday.psgtech.ac.in/",
    imageSrc: "/projects/psgfoundation.png",
    isFeatured: true,
  },
  {
    title: "FOOD_VISION",
    shortDescription: "Deep learning food classification with transfer learning",
    description:
      "CNN-driven food recognition system using transfer learning with EfficientNet. Features deep learning image classification, high accuracy across diverse food categories, modular preprocessing pipeline with image augmentation and normalization. Successfully reduced overfitting during training.",
    techStack: [
      TECH_STACK.PYTHON,
      TECH_STACK.TENSORFLOW,
      TECH_STACK.DEEP_LEARNING,
    ],
    githubLink: "https://github.com/MohamedAklamaash/Food_VisionWithCNN",
    deployedLink: undefined,
    imageSrc: "/projects/foodvision.png",
    isFeatured: false,
  },
  {
    title: "StubHub",
    shortDescription: "Ticket marketplace for event organizers and attendees",
    description:
      "Simplified ticket marketplace platform where event organizers can list events and users can browse and purchase tickets. Features event listing for organizers, ticket browsing and purchasing, and user-friendly marketplace interface.",
    techStack: [
      TECH_STACK.NEXTJS,
      TECH_STACK.NODEJS,
      TECH_STACK.TYPESCRIPT,
      TECH_STACK.MICROSERVICES,
      TECH_STACK.SAGA,
      TECH_STACK.POSTGRESQL,
    ],
    githubLink: "https://github.com/MohamedAklamaash/stubhub",
    deployedLink: undefined,
    imageSrc: "/projects/stubhub.png",
    isFeatured: false,
  },
  {
    title: "Friends",
    shortDescription: "Social media prototype for connecting and sharing",
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
    title: "Vreudge",
    shortDescription: "Distributed file system built with Go",
    description:
      "Decentralized distributed file system built with Golang. Features decentralized architecture and distributed file storage for reliable and scalable file management.",
    techStack: [
      TECH_STACK.GO,
      TECH_STACK.NETWORKS,
      TECH_STACK.FTP,
    ],
    githubLink: "https://github.com/MohamedAklamaash/Vreudge",
    deployedLink: undefined,
    imageSrc: "/projects/vreudge.png",
    isFeatured: false,
  },
  {
    title: "Alumni Meet",
    shortDescription: "Alumni networking and event management platform",
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
  {
    title: "SmartScreenshot",
    shortDescription: "OCR-based sensitive content detection and masking system",
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
