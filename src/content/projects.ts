import type { ProfileId } from "./site";

/**
 * Every project shown on the site. Selection and reasoning are documented in
 * PROJECT_CURATION.md. Numbers quoted here come from each repository's own
 * README or committed results. Do not add figures that aren't there.
 */

export type StatusTone = "active" | "released" | "complete" | "research";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface FlowStep {
  title: string;
  detail?: string;
}

export interface CaseSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  flow?: { caption: string; steps: FlowStep[] };
  table?: { caption: string; head: string[]; rows: string[][] };
  code?: { caption: string; language: string; source: string; code: string };
}

export interface Project {
  slug: string;
  name: string;
  profile: ProfileId;
  /** Short descriptor shown above the name, e.g. "Deployment platform". */
  kind: string;
  status: { label: string; tone: StatusTone };
  /** Active period, from the repository history. */
  period: string;
  /** What it is and why it exists. One or two sentences. */
  summary: string;
  /** The technically interesting part. One or two sentences. */
  interesting: string;
  /** What I did on it. */
  role: string;
  stack: string[];
  links: ProjectLink[];
  /** Link to a related blog post, if one exists. */
  post?: { title: string; href: string };
  image?: { src: string; alt: string; width: number; height: number };
  /** Only real, sourced figures. */
  figures?: { value: string; label: string }[];
  /** Compact projects get a shorter card on the profile page. */
  compact?: boolean;
  caseStudy?: {
    title: string;
    description: string;
    sections: CaseSection[];
  };
}

const gh = (repo: string) => `https://github.com/MohamedAklamaash/${repo}`;

export const PROJECTS: Project[] = [
  // ───────────────────────────── Software ─────────────────────────────
  {
    slug: "launchpad",
    name: "Launchpad",
    profile: "software",
    kind: "Deployment platform",
    status: { label: "Actively developed", tone: "active" },
    period: "Jan 2026 – present",
    summary:
      "A self-hosted deployment platform. You connect your AWS account and a GitHub repository, and Launchpad builds the app and runs it on ECS or EKS inside your own account, so there is no shared infrastructure and nothing to pay on top of AWS.",
    interesting:
      "Everything runs in someone else's AWS account using short-lived credentials, so most of the work went into the parts around the happy path: credentials expiring halfway through a deploy, Terraform state per tenant and many apps sharing one load balancer.",
    role: "Solo project. I designed and built the services, the Terraform modules, the deploy pipeline and the front end.",
    stack: [
      "Python",
      "Django",
      "Terraform",
      "AWS ECS",
      "Amazon EKS",
      "CodeBuild",
      "RabbitMQ",
      "Redis",
      "PostgreSQL",
      "NGINX",
      "React",
      "TypeScript",
    ],
    links: [
      { label: "Source", href: gh("launchpad") },
      { label: "Live site", href: "https://launchpad-five-lilac.vercel.app" },
    ],
    post: {
      title: "Vercel-Style Deploys, Inside Your Own AWS",
      href: "/posts/why-i-built-launchpad",
    },
    image: {
      src: "/projects/launchpad.png",
      alt: "Launchpad landing page with the headline 'Deploy to AWS without the complexity' above a dashboard showing infrastructures, applications and deployments.",
      width: 1544,
      height: 804,
    },
    caseStudy: {
      title: "Launchpad: deploys inside your own AWS account",
      description:
        "How Launchpad turns a GitHub repository into a running ECS or EKS service in the user's own AWS account, and the problems around credentials, Terraform and shared load balancers.",
      sections: [
        {
          heading: "Why I built it",
          paragraphs: [
            "Every time I deployed a side project I had two options. I could use a managed platform, which is pleasant until you need something custom or the bill arrives. Or I could set up ECS, a load balancer, ECR, security groups and IAM roles by hand, which takes half a day before any actual app code runs.",
            "I wanted a third option: push-to-deploy, but with everything running in my own AWS account. Launchpad is the control plane. It never runs your code itself.",
          ],
        },
        {
          heading: "How it fits together",
          paragraphs: [
            "The platform is split into a gateway, an identity service, a payment service and two deployment services: one that provisions infrastructure and one that deploys applications. Each deployment service has its own worker. Deploy jobs go through Redis queues and services talk to each other through RabbitMQ events, so the API responds immediately and the client follows progress while the work happens in the background.",
          ],
          flow: {
            caption: "What happens when an app is deployed",
            steps: [
              {
                title: "Check",
                detail:
                  "Infrastructure is active and AWS credentials are fresh",
              },
              {
                title: "Build",
                detail:
                  "CodeBuild in the user's account builds the Docker image",
              },
              {
                title: "Push",
                detail: "Image goes to the user's ECR registry",
              },
              {
                title: "Define",
                detail: "ECS task definition with the chosen CPU and memory",
              },
              {
                title: "Route",
                detail:
                  "Target group and ALB listener rule for path-based routing",
              },
              {
                title: "Run",
                detail:
                  "ECS service starts and Launchpad waits for it to settle",
              },
            ],
          },
        },
        {
          heading: "The parts that took the most time",
          list: [
            "Credentials. Launchpad assumes an IAM role in the user's account with sts:AssumeRole, which gives credentials that last an hour. A long Terraform apply or a slow ECS rollout can outlive them, so the platform detects expiry mid-operation and re-assumes the role. Credentials are no longer stored anywhere.",
            "Small AWS races. Attaching a new target group to the ALB listener isn't always visible straight away, and before I added a short wait and a verification step about one in five deploys failed silently at the routing step. CodeBuild also kept hitting Docker Hub's pull limits from AWS's shared IPs, which went away after switching base images to ECR Public.",
            "One load balancer, many apps. Each app gets its own path-based listener rule on a shared ALB, with an NGINX sidecar handling path rewriting and health checks. Apps that hard-code a port different from the configured one were a common cause of failed deploys, so the platform now detects the port.",
            "A second compute target. EKS (Auto Mode) was added alongside ECS in five phases: data model, onboarding and STS changes, provisioning and teardown, the deployer itself and the UI. The plan went through a security review first, and I kept a written record of where each fix landed.",
            "Tests. The services have a large pytest suite with mocked AWS and Kubernetes clients, so the pipeline can be tested without touching a real account.",
          ],
        },
        {
          heading: "Current state",
          paragraphs: [
            "Launchpad is still under active development. ECS deploys work end to end, EKS is implemented behind a feature flag, and there are design notes for managed databases and per-tenant DNS. The repository has the full docs, including the edge cases I've run into so far.",
          ],
        },
      ],
    },
  },
  {
    slug: "relay",
    name: "relay",
    profile: "software",
    kind: "Job queue for Go",
    status: { label: "Usable, unreleased", tone: "complete" },
    period: "Nov 2025 – Jun 2026",
    summary:
      "A background job system for Go, backed by Redis. You enqueue tasks from anywhere, a pool of workers processes them, and jobs that were running on a worker that crashed get picked up again automatically.",
    interesting:
      "Crash recovery without a broker. Each dequeued task gets a lease with an expiry. Workers extend the lease while they run, and a recoverer moves tasks with expired leases back to the queue. That gives at-least-once delivery using only Redis and a few Lua scripts.",
    role: "Solo project. I wrote the library, the Redis layer, the CLI, the tests and the docs site.",
    stack: ["Go", "Redis", "Lua", "Prometheus", "Docker"],
    links: [
      { label: "Source", href: gh("relay") },
      { label: "Docs", href: "https://mohamedaklamaash.github.io/relay/" },
    ],
    caseStudy: {
      title: "relay: a Redis-backed job queue for Go",
      description:
        "How relay gets at-least-once delivery and crash recovery from Redis alone, using visibility-timeout leases, Lua scripts, retries and a dead-letter archive.",
      sections: [
        {
          heading: "What it is",
          paragraphs: [
            "relay is a library for running background jobs in Go, in the same family as Sidekiq or asynq. I built it to understand what those tools are actually doing underneath, and kept going until it was something I would use.",
          ],
          list: [
            "Immediate, delayed (ProcessIn and ProcessAt) and recurring cron jobs",
            "Retries with exponential backoff, then a dead-letter archive",
            "Weighted priority queues that can be paused and resumed",
            "Optional deduplication, per-task timeouts, deadlines and remote cancellation",
            "Prometheus metrics and a CLI to inspect and manage queues",
          ],
        },
        {
          heading: "Leases instead of acknowledgements",
          paragraphs: [
            "The core problem is simple to state: if a worker takes a job and then dies, the job must not disappear. Message brokers solve this with acknowledgements. relay does it with a sorted set of leases in Redis.",
            "Dequeuing is one atomic Lua script. It moves the task ID from the pending list to the active list and records a lease that expires at a given time. While the handler runs, a heartbeat pushes the expiry forward. If the worker disappears, the heartbeat stops and the lease runs out.",
          ],
          code: {
            caption: "Dequeue and recovery, both atomic on the Redis side",
            language: "lua",
            source: "internal/rdb/scripts.go",
            code: `-- dequeue: pending -> active, and start a lease
local id = redis.call("RPOPLPUSH", KEYS[1], KEYS[2])
if not id then
	return nil
end
redis.call("ZADD", KEYS[3], tonumber(ARGV[1]), id)

-- recover: anything whose lease expired goes back to pending
local ids = redis.call("ZRANGEBYSCORE", KEYS[1], "-inf", ARGV[1], "LIMIT", 0, tonumber(ARGV[2]))
for _, id in ipairs(ids) do
	redis.call("ZREM", KEYS[1], id)
	redis.call("LREM", KEYS[2], 0, id)
	redis.call("LPUSH", KEYS[3], id)
end`,
          },
        },
        {
          heading: "Trade-offs",
          list: [
            "At-least-once means a task can run twice, for example if a worker stalls past its lease and then finishes. Handlers need to be idempotent, and the docs say so.",
            "Recovery runs on an interval, so a crashed task waits up to the lease timeout plus one recovery tick before it is retried.",
            "Everything depends on one Redis. That keeps the system simple but makes Redis the single point of failure.",
          ],
        },
        {
          heading: "Testing",
          paragraphs: [
            "The Redis layer has unit tests for each script, including one that dequeues with an already-expired lease and checks that recovery puts the task back. There are also integration tests that run a real server against Redis.",
          ],
        },
      ],
    },
  },
  {
    slug: "syncset-db",
    name: "syncset-db",
    profile: "software",
    kind: "Postgres replication tool",
    status: { label: "Released on PyPI", tone: "released" },
    period: "Jan 2026 – Feb 2026",
    summary:
      "A small Python tool that copies only the tables and columns you choose from one PostgreSQL database to one or more replicas. It came from needing to share part of a database with another service without copying all of it.",
    interesting:
      "It keeps replica schemas in step with the primary, syncs incrementally using a high-watermark on the primary key and can compare row checksums to skip rows that haven't changed. It doesn't do change data capture yet, so updates to old rows are only caught when checksums are on.",
    role: "Solo project, published on PyPI.",
    stack: ["Python", "PostgreSQL", "SQLAlchemy", "YAML"],
    links: [
      { label: "Source", href: gh("syncset") },
      { label: "PyPI", href: "https://pypi.org/project/syncset-db/" },
    ],
    post: {
      title: "Sync a Slice of Postgres, Not the Whole Database",
      href: "/posts/why-i-built-syncset-db",
    },
    compact: true,
  },

  // ─────────────────────────────── AI / ML ───────────────────────────────
  {
    slug: "redharness",
    name: "redharness",
    profile: "ai",
    kind: "LLM robustness benchmark",
    status: { label: "v0.1.0 on PyPI", tone: "released" },
    period: "May 2026 – Jun 2026",
    summary:
      "A benchmark for how well language models hold up against jailbreaks, prompt injection and data leakage. I started it after noticing that the same attack could get very different success rates depending on the dataset version and on who, or what, graded it.",
    interesting:
      "It standardises the evaluation, not the attack. Every result records the dataset version, the judge and the metric that produced it. In the first real run, scoring the same PAIR transcripts with a string-match judge gave an attack success rate of 1.00, and a rubric grader gave 0.15.",
    role: "Solo project. I designed the methodology and wrote the harness, plugins, tests and documentation.",
    stack: [
      "Python",
      "LLM evaluation",
      "OpenAI API",
      "Anthropic API",
      "Streamlit",
      "mypy",
    ],
    links: [
      { label: "Source", href: gh("redharness") },
      { label: "PyPI", href: "https://pypi.org/project/redharness/" },
    ],
    post: {
      title: "The Same Jailbreak Scored 1.00 and 0.15",
      href: "/posts/why-i-built-redharness",
    },
    figures: [
      {
        value: "1.00 vs 0.15",
        label:
          "PAIR attack success, string-match vs rubric judge, same transcripts",
      },
      { value: "3", label: "threat surfaces under one methodology" },
    ],
    caseStudy: {
      title: "redharness: LLM robustness benchmark",
      description:
        "Methodology, judge sensitivity and first results from redharness, a benchmark for LLM jailbreak, prompt-injection and data-leakage evaluation with per-result provenance.",
      sections: [
        {
          heading: "Problem",
          paragraphs: [
            "LLM safety papers report attack success rates that are hard to compare. One paper says 90%, another says 15% for what sounds like the same attack on the same model. Most of the gap comes from three places: what counts as success, which behaviours were tested and which judge decided. StrongREJECT (Souly et al., 2024) showed that weak judges systematically inflate jailbreak success.",
            "The benchmarks that people actually adopted, like HarmBench and JailbreakBench, won by fixing the evaluation: fixed behaviours, fixed judges and versioned artifacts. redharness tries to apply the same idea across three surfaces at once, including prompt injection and data leakage, which are much less standardised.",
          ],
        },
        {
          heading: "Approach",
          paragraphs: [
            "An evaluation is a grid over five pluggable parts. A run goes through every cell of the grid and scores it. Agentic prompt injection adds two more parts: a sandboxed tool scenario and the injection itself.",
          ],
          flow: {
            caption: "One evaluation cell",
            steps: [
              { title: "Dataset", detail: "Versioned, hash-pinned behaviours" },
              {
                title: "Attack",
                detail: "static, template, PAIR, TAP, crescendo",
              },
              { title: "Target", detail: "The model or agent under test" },
              {
                title: "Judge",
                detail: "String match, StrongREJECT rubric, leak detectors",
              },
              {
                title: "Metric",
                detail: "ASR, refusal rate, false refusal rate, cost",
              },
            ],
          },
          list: [
            "Datasets are checked against a SHA-256 hash before use and are never committed to the repository.",
            "Runs are seeded, attempts are cached on their fully resolved parameters and every prompt and response is saved as JSONL.",
            "Plugins are looked up by name from YAML through a closed registry, so a config file can't execute code.",
            "The core runs fully offline against deterministic targets. Live models, real datasets and heavier frameworks are opt-in extras, and CI checks that the core stays offline.",
          ],
        },
        {
          heading: "First real-model results",
          paragraphs: [
            "The first end-to-end run used claude-haiku-4-5 as the target and gpt-4o-mini as the attacker and grader, on commit-pinned public datasets. The leaderboards are committed to the repository.",
          ],
          table: {
            caption:
              "Results as reported in the repository (results/real_eval_v1)",
            head: ["Evaluation", "Result", "What it shows"],
            rows: [
              [
                "AdvBench, direct (static)",
                "ASR 0.00, refusal rate 1.00",
                "Aligned models refuse direct harmful requests",
              ],
              [
                "AdvBench, PAIR",
                "ASR 0.15 (StrongREJECT) vs 1.00 (string match)",
                "Same transcripts, about 6.7× apart depending on the judge",
              ],
              [
                "XSTest, safe split",
                "False refusal rate 0.00",
                "No over-refusal of benign prompts",
              ],
            ],
          },
        },
        {
          heading: "Limitations",
          list: [
            "One target model so far, so these are a fidelity check rather than a leaderboard.",
            "Local classifier judges (Llama Guard, WildGuard, the HarmBench classifier) are not integrated yet.",
            "GCG, garak and PyRIT are registered as scaffolds. Their heavy dependencies aren't verified in CI.",
            "The bundled synthetic datasets show how the harness works. Their numbers say nothing about any real model's safety.",
          ],
        },
      ],
    },
  },
  {
    slug: "nanocoder-math",
    name: "nanocoder-math",
    profile: "ai",
    kind: "Language model from scratch",
    status: { label: "Research project", tone: "research" },
    period: "Apr 2026 – Jun 2026",
    summary:
      "A small decoder-only GPT for code and maths, trained from scratch on a single laptop. The question was how much a small model can learn when the tokeniser, data, model, optimiser and evaluation all have to run on one machine.",
    interesting:
      "Each lever was tested as a controlled ablation. Switching from AdamW to Muon lowered validation perplexity from 645 to 539 at the same token budget, and a verified synthetic arithmetic corpus did far more for maths ability than scale could at this size.",
    role: "Solo project. I wrote the model, tokeniser, data pipeline, Muon implementation and evaluation code in plain PyTorch.",
    stack: [
      "Python",
      "PyTorch",
      "Transformers",
      "BPE",
      "Muon",
      "GRPO",
      "SymPy",
    ],
    links: [{ label: "Source", href: gh("nanocoder-math") }],
    figures: [
      {
        value: "645 → 539",
        label: "validation perplexity, AdamW → Muon, same tokens",
      },
      { value: "83.2%", label: "exact match on single-digit arithmetic" },
    ],
    caseStudy: {
      title: "nanocoder-math: a small GPT from scratch",
      description:
        "A from-scratch decoder-only language model for code and maths with controlled ablations on optimiser, data and architecture, including Muon vs AdamW and GRPO with a verifiable reward.",
      sections: [
        {
          heading: "Question",
          paragraphs: [
            "How much can a small language model learn when everything has to run on one machine? I couldn't scale tokens or parameters, so the project looks at the levers that are left: data quality, optimiser efficiency and architecture choices. Each one was tested on its own.",
            "It started as a reimplementation of the original encoder-decoder Transformer (Vaswani et al., 2017), which is still in the repository, and was rebuilt into a decoder-only model.",
          ],
        },
        {
          heading: "Setup",
          list: [
            "Pre-norm decoder-only Transformer with RoPE, SwiGLU and tied embeddings. Positional encoding, norm placement, activation, QK-norm and logit soft-capping can each be switched for ablations.",
            "Two sizes: tiny (16.8M parameters) and small (33.9M), both with a 1024-token context.",
            "A byte-level BPE tokeniser with 16k merges, trained on the target corpus. At this size a 50k vocabulary would take up too much of the parameter budget.",
            "Streaming data from public datasets (codeparrot-clean and open-web-math) into memory-mapped uint16 shards, with the code-to-maths mix set at training time.",
            "A procedurally generated arithmetic and algebra corpus where every example is checked with SymPy, or by running it for code, before it is used.",
            "Developed on an Apple M4 (MPS, fp32). A single device module picks bf16 with torch.compile on modern CUDA and fp16 with loss scaling on older GPUs.",
          ],
        },
        {
          heading: "Results",
          paragraphs: [
            "All numbers are from the repository README, measured on a single Apple M4 with 24 GB of memory.",
          ],
          table: {
            caption: "Controlled comparisons",
            head: ["Experiment", "Baseline", "Result"],
            rows: [
              [
                "Optimiser (tiny model, equal tokens)",
                "AdamW: val PPL 645",
                "Muon: val PPL 539",
              ],
              [
                "Synthetic arithmetic corpus",
                "~0% on GSM8K and HumanEval at this scale",
                "31.2% exact match overall, 83.2% single-digit",
              ],
              [
                "GRPO with an exact arithmetic verifier",
                "53.8% overall, 93.0% single-digit",
                "57.4% overall, 98.4% single-digit",
              ],
              [
                "MLX port, benchmarked first",
                "PyTorch-MPS throughput",
                "1.05× (below the 1.5× bar set in advance, so not ported)",
              ],
            ],
          },
        },
        {
          heading: "Things I learned the hard way",
          list: [
            "On Apple's Metal backend, fp16 autocast was slower than fp32, not faster.",
            "Non-blocking host-to-device copies on MPS raced and corrupted batches. The code now avoids them.",
            "Deciding the bar for the MLX port before measuring it made it easy to drop. Writing that negative result down was more useful than another half-finished port.",
          ],
        },
        {
          heading: "Limitations",
          list: [
            "The models are tiny, so results are about relative changes, not absolute capability.",
            "GSM8K and HumanEval stay near zero at this scale. The arithmetic results come from a matched synthetic test set.",
            "There is no automated test suite yet. Reproducibility comes from the scripted commands in the README.",
          ],
        },
      ],
    },
  },
  {
    slug: "codegraph",
    name: "codegraph",
    profile: "ai",
    kind: "Retrieval over source code",
    status: { label: "Working prototype", tone: "complete" },
    period: "Apr 2026 – Jun 2026",
    summary:
      'Give it a GitHub repository and it builds a graph of the codebase, where every function is a node and every call is an edge. You can explore the graph or ask questions like "where is billing handled?" and get answers grounded in the actual code.',
    interesting:
      "Plain vector search finds functions that look like the question but misses the code they depend on. codegraph takes the top matches from pgvector and then follows call edges one hop out before building the context, so answers include the functions that actually do the work.",
    role: "Solo project. I built the parser, the graph and embedding pipeline, the retrieval and chat API and the React front end.",
    stack: [
      "Python",
      "Django",
      "PostgreSQL",
      "pgvector",
      "Gemini embeddings",
      "SSE",
      "React",
      "Docker",
    ],
    links: [{ label: "Source", href: gh("codegraph") }],
    image: {
      src: "/projects/codegraph.png",
      alt: "codegraph showing a repository's function call graph in the centre, a file explorer on the left and a chat panel on the right answering 'What happens after login?' with file and function references.",
      width: 2105,
      height: 1184,
    },
    caseStudy: {
      title: "codegraph: retrieval over source code",
      description:
        "How codegraph parses a repository into a function call graph, embeds each function into pgvector and expands vector search results along call edges to answer questions about the code.",
      sections: [
        {
          heading: "Problem",
          paragraphs: [
            "Reading an unfamiliar codebase usually means a lot of grepping. Asking an LLM helps only if it gets the right code as context, and a codebase is a bad fit for chunk-and-embed retrieval: the function whose name matches your question is often a thin wrapper, and the logic lives in what it calls.",
          ],
        },
        {
          heading: "Pipeline",
          flow: {
            caption: "From repository URL to answer",
            steps: [
              {
                title: "Clone",
                detail: "Public or private repo through GitHub OAuth",
              },
              {
                title: "Parse",
                detail:
                  "Functions and the calls inside them, across 9 languages",
              },
              {
                title: "Store",
                detail: "Function nodes and call edges in PostgreSQL",
              },
              {
                title: "Embed",
                detail: "Each function embedded with Gemini into pgvector",
              },
              {
                title: "Retrieve",
                detail:
                  "Top 8 by vector distance, then one hop along call edges",
              },
              {
                title: "Answer",
                detail: "Grounded response streamed over SSE",
              },
            ],
          },
          paragraphs: [
            "Python is parsed with the standard library's ast module. The other languages (JavaScript, TypeScript, Go, Rust, Java, C, C++ and Kotlin) use lighter regex and brace matching, which is less precise but good enough to build a useful call graph.",
          ],
        },
        {
          heading: "Retrieval",
          code: {
            caption:
              "Seed with vector search, then expand along the call graph",
            language: "python",
            source: "backend/apps/chat/views.py",
            code: `query_vec = embed_texts([query])[0]

hits = (
    FunctionEmbedding.objects
    .filter(function__repository_id=repo_id)
    .order_by(L2Distance("vector", query_vec))[:TOP_K]
)
seed_ids = [h.function_id for h in hits]

expanded_ids = set(seed_ids)
for edge in FunctionEdge.objects.filter(
    source_id__in=seed_ids, repository_id=repo_id
):
    expanded_ids.add(edge.target_id)`,
          },
          list: [
            "Every query is scoped to one repository, including the edge expansion, so a stray edge can't pull in another repository's code.",
            "Embedding calls are batched, run in parallel and retried on transient API errors.",
          ],
        },
        {
          heading: "What's missing",
          list: [
            "There is no retrieval evaluation yet. I haven't measured recall against a labelled set of questions, so I can't say how much the graph expansion helps compared with vector search alone. That's the next thing I want to do.",
            "Regex-based parsing misses some calls in non-Python languages. Moving to tree-sitter would fix most of that.",
          ],
        },
      ],
    },
  },
  {
    slug: "rampart",
    name: "RAMPART",
    profile: "ai",
    kind: "Multi-agent RL research",
    status: { label: "Research, simulation only", tone: "research" },
    period: "Mar 2026 – Jun 2026",
    summary:
      "A study of whether a set of specialist portfolio strategies, coordinated by a regime-aware router, can beat a single reinforcement learning agent and simple baselines out of sample, after costs. It runs on synthetic prices and never places real trades.",
    interesting:
      "The evaluation harness was built first. Purged walk-forward backtests, realistic costs and honest baselines meant that coordination won on trending data (Sharpe about 1.19 vs 0.83 for equal weight) but lost under fast regime switching. Both results are reported.",
    role: "Solo project. I built the router, the specialist strategies, the risk checks, the backtester and the small UI.",
    stack: [
      "Python",
      "PyTorch",
      "Stable-Baselines3 (PPO)",
      "Gymnasium",
      "pandas",
      "FastAPI",
      "React",
    ],
    links: [{ label: "Source", href: gh("RAMPART") }],
    figures: [
      {
        value: "1.19 vs 0.83",
        label: "Sharpe, soft blending vs 1/N, single-trend regime",
      },
      {
        value: "−0.52 vs 0.23",
        label: "Sharpe, soft blending vs 1/N, regime switching",
      },
    ],
    caseStudy: {
      title: "RAMPART: multi-agent portfolio allocation",
      description:
        "A research project on coordinating specialist strategies with a regime-aware router, scored with purged walk-forward backtests against 1/N, a monolithic PPO agent and Markowitz.",
      sections: [
        {
          heading: "Question",
          paragraphs: [
            "Can a group of specialist strategies, picked by a router that reads the market regime and checked by deterministic risk rules, do better than one big RL agent or plain equal weighting? This is research on synthetic data. It is not a trading system and not investment advice.",
          ],
        },
        {
          heading: "Design",
          paragraphs: [
            "Decisions about money are deterministic and checked. A separate language layer only turns a natural-language goal into a mandate and explains the result afterwards. It never touches allocations.",
          ],
          flow: {
            caption: "Decision path",
            steps: [
              {
                title: "Router",
                detail:
                  "Trend and volatility regime, with confidence and hysteresis",
              },
              {
                title: "Specialists",
                detail:
                  "Momentum, Markowitz, risk parity, min variance, defensive cash, PPO",
              },
              {
                title: "Verifier",
                detail:
                  "Feasibility, concentration cap and turnover budget, then repair or fall back",
              },
              {
                title: "Allocation",
                detail:
                  "Weights plus the regime, specialist and guardrail status behind them",
              },
            ],
          },
          list: [
            "Hard routing picks one specialist. Soft blending mixes them by a smoothed regime probability.",
            "The explanation is checked against the actual weights, regime and top holding before it is shown.",
          ],
        },
        {
          heading: "Evaluation",
          list: [
            "Purged, embargoed walk-forward splits to avoid leaking training data into tests.",
            "Costs include the bid-ask spread, commission and square-root market impact.",
            "Baselines: buy-and-hold, equal weight (1/N) and Markowitz. An ablation compares the coordinator with the monolithic RL agent, the best single specialist in hindsight and 1/N.",
            "Seeded end to end. Missing or infinite values raise an error instead of being filled with zeros.",
          ],
        },
        {
          heading: "Results",
          table: {
            caption:
              "Out-of-sample Sharpe after costs, as reported in the repository",
            head: [
              "Data",
              "Soft blending",
              "Hard routing",
              "1/N",
              "Monolithic PPO",
            ],
            rows: [
              ["Single-trend regime", "≈ 1.19", "–", "0.83", "−0.76"],
              ["Regime switching", "≈ −0.52", "≈ −0.44", "0.23", "–"],
            ],
          },
          paragraphs: [
            "Coordination helps when regimes persist. When they switch quickly, the blend keeps reweighting and the turnover costs more than diversification gives back. Equal weighting is known to be hard to beat (DeMiguel, Garlappi and Uppal, 2009), and this reproduces that.",
          ],
        },
        {
          heading: "Limitations",
          list: [
            "Prices are synthetic, so regimes are a property of the generator, not of a real market.",
            "The regime detector is a simple classifier and lags by design.",
            "The PPO specialist does worse than the classical strategies on this data.",
            "There is no order-book simulation. Execution realism stops at the cost model.",
          ],
        },
      ],
    },
  },
  {
    slug: "patternix",
    name: "patternix",
    profile: "ai",
    kind: "Paper implementation",
    status: { label: "Complete", tone: "complete" },
    period: "Mar 2026 – Apr 2026",
    summary:
      "An implementation of reservoir pattern sampling for data streams, from Giacometti and Soulet's paper, applied to the Online Retail transactions dataset. It keeps a bounded sample of frequent itemsets as transactions stream in.",
    interesting:
      "Three variants: all-time, sliding window and exponential decay. They are compared with FP-Growth on recall, runtime and memory. On 10k transactions with k = 500, each variant runs in about 0.1 s.",
    role: "Solo implementation of the paper, plus the evaluation script.",
    stack: [
      "Python",
      "pandas",
      "Streaming algorithms",
      "Frequent pattern mining",
    ],
    links: [{ label: "Source", href: gh("patternix") }],
    compact: true,
  },
];

export const projectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const projectsFor = (profile: ProfileId) =>
  PROJECTS.filter((p) => p.profile === profile);

export const caseStudies = () => PROJECTS.filter((p) => p.caseStudy);
