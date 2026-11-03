# Website copy

Generated from `src/content/*` by `pnpm content:md`. Edit the TypeScript files, not this one, then regenerate.

## Shared identity

- Name: Mohamed Aklamaash (short: Aklamaash; full: Mohamed Aklamaash M.R)
- Location: Coimbatore, Tamil Nadu, India
- Email: aklamaash78@gmail.com
- GitHub: https://github.com/MohamedAklamaash
- LinkedIn: https://www.linkedin.com/in/aklamaash/
- Education: M.Sc. (Integrated) Data Science, PSG College of Technology, Aug 2022 – May 2027 (expected)
- Resumes: /Aklamaash_Resume_SDE.pdf, /Aklamaash_Resume_AI.pdf

## Homepage `/`

**Title:** Mohamed Aklamaash: Software Engineer, Backend and AI

**Description:** Mohamed Aklamaash (Aklamaash) is a software engineer from India working on backend systems, cloud infrastructure, machine learning and AI. Final-year M.Sc. Data Science at PSG Tech.

### Hey, I'm Aklamaash.

I'm a software engineer from India. I like building things and figuring out how they work underneath. Most of my work so far has been on backend systems and cloud infrastructure, with a good amount of machine learning and AI alongside.

The problems I enjoy most are the ones that make me slow down and think. Designing a backend that still behaves when a worker dies halfway through a job. Working out why a model's results look better than they really are. Getting an application to run reliably in the cloud without the bill getting silly.

I'm in the final year of an integrated M.Sc. in Data Science at PSG College of Technology, and I've spent about a year as an intern at Unbound Security. Here's a bit more about what I've been working on.

**Paths**

- **Software Engineering** (/software): Backend engineering, distributed systems, cloud infrastructure and full-stack work. Including Tale Analytics, Launchpad, relay.
- **AI and Machine Learning** (/ai): Machine learning, LLM evaluation, training models and research-style projects. Including redharness, nanocoder-math, codegraph.

**Right now**

- Building: Tale Analytics, a financial analytics product.
- Studying: Final year of an integrated M.Sc. in Data Science, finishing in May 2027.
- Looking for: Software engineering and AI engineering roles.

## Tale Analytics (featured on /software)

Tale Analytics is a financial analytics product I'm working on. It brings a company's financial data and accounting workflows into one place, with features for reconciliation, reporting and the month-end close.

It's the first thing I've built that is meant for real users rather than as a project, so most of my time goes into the unglamorous parts: getting data in correctly, keeping numbers consistent and making the workflows feel obvious. I'll write up the engineering side properly once it's further along.

Link: https://app.aklamaash.me · Status: In development

## Software Engineering `/software`

**Title:** Software Engineer: Backend and Cloud Infrastructure

**Description:** Software engineering profile of Mohamed Aklamaash: backend engineering, distributed systems and AWS cloud infrastructure. GCP to AWS migration and billing at Unbound Security (YC S24), plus Launchpad, relay and Tale Analytics.

### Backend systems, infrastructure and the products on top of them.

I like backend work because it's where software actually has to hold up. A demo only needs to work once. A real system has to keep working when traffic jumps, a server goes down or someone changes the database underneath it. Working out how to build something that handles all that calmly is the part of engineering I enjoy most.

At Unbound Security I moved the company's product from Google Cloud to AWS, which cut the infrastructure bill by up to 20%, and rebuilt how customers get billed. Later I worked on letting large customers run the whole product inside their own cloud. On my own, I built Launchpad, which takes any GitHub project and deploys it into your own AWS account in a few minutes. Right now I'm building Tale Analytics, a financial analytics product.

Open to software engineer, backend, platform and infrastructure roles.

**Focus:** Backend services and APIs · Distributed systems and queues · AWS, Kubernetes and Terraform · Databases and data movement

**Selected work:** A product I'm building, and three projects I'd be happy to walk through in an interview.

**Projects:** Launchpad, relay, syncset-db

**Experience intro:** About a year across two internships, mostly on cloud infrastructure, billing and security tooling.

**Technical areas**

- Languages: Python, Go, TypeScript, Java, C++, SQL (used in: Python and Go at Unbound; Go for relay; TypeScript for front ends)
- Backend: Django, FastAPI, Node.js, REST APIs, Microservices, Server-Sent Events (used in: Unbound, Launchpad, codegraph)
- Cloud and infrastructure: AWS (ECS, EKS, ALB, CodeBuild, ECR), GCP, Docker, Kubernetes, Terraform, Helm, ArgoCD, NGINX (used in: GCP to AWS migration and BYOC on EKS at Unbound; Launchpad)
- Data and messaging: PostgreSQL, MongoDB, Redis, RabbitMQ, Kafka (used in: Launchpad, relay, syncset-db)
- Observability: Prometheus, Grafana, CloudWatch (used in: Monitoring for BYOC at Unbound; relay metrics; Launchpad logs)

**Cross-link:** I also work on machine learning and AI, mostly evaluating language models and training small ones. That work is on a separate page.

## AI and Machine Learning `/ai`

**Title:** AI and Machine Learning: LLM Evaluation and Training

**Description:** AI and machine learning profile of Mohamed Aklamaash: LLM robustness evaluation (redharness), a GPT trained from scratch, multi-agent reinforcement learning, applied ML and a Data Science background. Open to AI engineer and ML engineer roles.

### Testing models properly and training my own.

I studied Data Science, but what pulled me into AI is how often a model looks great until you measure it properly. I like the questions that come with that: is this result real, would it hold up on different data, and what has the model actually learnt? That's why most of my AI work ends up being about evaluating models and training them myself.

My favourite project here is redharness, a benchmark for how easily language models can be tricked into misbehaving. While building it I found the same attack scored 100% with one grader and 15% with another, which says a lot about how AI safety numbers get reported. I've also trained a small GPT from scratch on my laptop to understand what actually makes training work. At Unbound Security I built secrets detection for an AI security product and tuned it to catch 97% of leaked keys and passwords in testing.

Open to AI engineer, ML engineer and applied AI roles.

**Focus:** LLM evaluation and safety · Training and ablating small models · Reinforcement learning · Experiment design

**Selected projects:** Each project lists the question, what I measured and where it falls short. Numbers come from the repositories.

**Projects:** redharness, nanocoder-math, codegraph, RAMPART, patternix

**Experience intro:** Two internships at an AI security company, including detection work on secrets and sensitive data.

**Technical areas**

- Deep learning: PyTorch, Decoder-only Transformers, BPE tokenisation, AdamW and Muon, Mixed precision (used in: nanocoder-math)
- LLM evaluation and safety: Benchmark design, LLM-as-judge, Judge agreement (Cohen's κ), Jailbreak and prompt-injection testing, DLP and secrets detection (used in: redharness; DLP at Unbound)
- Reinforcement learning: PPO (Stable-Baselines3), GRPO with verifiable rewards, Gymnasium environments (used in: RAMPART, nanocoder-math)
- Data science: NumPy, pandas, scikit-learn, Walk-forward backtesting, Streaming algorithms (used in: RAMPART, patternix, coursework)
- LLM applications: OpenAI, Anthropic and Gemini APIs, Embeddings with pgvector, FastAPI, Streamlit (used in: redharness, codegraph, RAMPART)

**Cross-link:** Most of my professional work has been backend and infrastructure. That's on the software engineering page.

## Experience (shared by every page)

### Unbound Security (YC S24), Remote / Bengaluru

Unbound builds a security platform that helps companies control how their employees and AI agents use AI tools. I interned there twice and worked on the backend, the cloud setup and the systems that detect sensitive data.

**Software Engineering Intern (Summer)**, May 2026 – Jun 2026

- Added detection for passwords, API keys and other secrets to the platform using TruffleHog. In testing it caught 97% of real secrets (94% F1). I then cut down the false alarms that security teams had been complaining about.
- Found and fixed a bug where some security policies were quietly not being applied, because different parts of the system used different names for the same field.
- Made it possible for large customers to run the whole product inside their own cloud account. This used Kubernetes on AWS (EKS) with Helm and ArgoCD for deployments, Authentik for single sign-on. Prometheus and Grafana handle the monitoring.

Stack: Go, Python, TruffleHog, Amazon EKS, Helm, ArgoCD, Authentik, Prometheus, Grafana

**Software Engineering Intern**, May 2025 – Dec 2025

- Moved the company's product, with all its services, from Google Cloud to AWS. This cut infrastructure costs by up to 20% without making anything slower or less reliable.
- Rebuilt the billing system so customers can be charged by invoice or by how much they use, and looked after it from design to launch.
- Improved the system that spots sensitive data, taking its accuracy above 90%.
- Built a fast notification service for real-time updates, and dashboards that show companies how their AI tools and agents are being used.

Stack: Python, Django, AWS, GCP, Docker, Kubernetes

## Projects

### Launchpad (Software) · Deployment platform · Actively developed · Jan 2026 – present

**Summary:** A self-hosted deployment platform. You connect your AWS account and a GitHub repository, and Launchpad builds the app and runs it on ECS or EKS inside your own account, so there is no shared infrastructure and nothing to pay on top of AWS.

**What was interesting:** Everything runs in someone else's AWS account using short-lived credentials, so most of the work went into the parts around the happy path: credentials expiring halfway through a deploy, Terraform state per tenant and many apps sharing one load balancer.

**My part:** Solo project. I designed and built the services, the Terraform modules, the deploy pipeline and the front end.

**Stack:** Python, Django, Terraform, AWS ECS, Amazon EKS, CodeBuild, RabbitMQ, Redis, PostgreSQL, NGINX, React, TypeScript

**Links:** [Source](https://github.com/MohamedAklamaash/launchpad) · [Live site](https://launchpad-five-lilac.vercel.app) · [Write-up](/posts/why-i-built-launchpad)

#### Case study: Launchpad: deploys inside your own AWS account

_How Launchpad turns a GitHub repository into a running ECS or EKS service in the user's own AWS account, and the problems around credentials, Terraform and shared load balancers._

**Why I built it**

Every time I deployed a side project I had two options. I could use a managed platform, which is pleasant until you need something custom or the bill arrives. Or I could set up ECS, a load balancer, ECR, security groups and IAM roles by hand, which takes half a day before any actual app code runs.

I wanted a third option: push-to-deploy, but with everything running in my own AWS account. Launchpad is the control plane. It never runs your code itself.

**How it fits together**

The platform is split into a gateway, an identity service, a payment service and two deployment services: one that provisions infrastructure and one that deploys applications. Each deployment service has its own worker. Deploy jobs go through Redis queues and services talk to each other through RabbitMQ events, so the API responds immediately and the client follows progress while the work happens in the background.

- 1. Check: Infrastructure is active and AWS credentials are fresh
- 2. Build: CodeBuild in the user's account builds the Docker image
- 3. Push: Image goes to the user's ECR registry
- 4. Define: ECS task definition with the chosen CPU and memory
- 5. Route: Target group and ALB listener rule for path-based routing
- 6. Run: ECS service starts and Launchpad waits for it to settle

**The parts that took the most time**

- Credentials. Launchpad assumes an IAM role in the user's account with sts:AssumeRole, which gives credentials that last an hour. A long Terraform apply or a slow ECS rollout can outlive them, so the platform detects expiry mid-operation and re-assumes the role. Credentials are no longer stored anywhere.
- Small AWS races. Attaching a new target group to the ALB listener isn't always visible straight away, and before I added a short wait and a verification step about one in five deploys failed silently at the routing step. CodeBuild also kept hitting Docker Hub's pull limits from AWS's shared IPs, which went away after switching base images to ECR Public.
- One load balancer, many apps. Each app gets its own path-based listener rule on a shared ALB, with an NGINX sidecar handling path rewriting and health checks. Apps that hard-code a port different from the configured one were a common cause of failed deploys, so the platform now detects the port.
- A second compute target. EKS (Auto Mode) was added alongside ECS in five phases: data model, onboarding and STS changes, provisioning and teardown, the deployer itself and the UI. The plan went through a security review first, and I kept a written record of where each fix landed.
- Tests. The services have a large pytest suite with mocked AWS and Kubernetes clients, so the pipeline can be tested without touching a real account.

**Current state**

Launchpad is still under active development. ECS deploys work end to end, EKS is implemented behind a feature flag, and there are design notes for managed databases and per-tenant DNS. The repository has the full docs, including the edge cases I've run into so far.

### relay (Software) · Job queue for Go · Usable, unreleased · Nov 2025 – Jun 2026

**Summary:** A background job system for Go, backed by Redis. You enqueue tasks from anywhere, a pool of workers processes them, and jobs that were running on a worker that crashed get picked up again automatically.

**What was interesting:** Crash recovery without a broker. Each dequeued task gets a lease with an expiry. Workers extend the lease while they run, and a recoverer moves tasks with expired leases back to the queue. That gives at-least-once delivery using only Redis and a few Lua scripts.

**My part:** Solo project. I wrote the library, the Redis layer, the CLI, the tests and the docs site.

**Stack:** Go, Redis, Lua, Prometheus, Docker

**Links:** [Source](https://github.com/MohamedAklamaash/relay) · [Docs](https://mohamedaklamaash.github.io/relay/)

#### Case study: relay: a Redis-backed job queue for Go

_How relay gets at-least-once delivery and crash recovery from Redis alone, using visibility-timeout leases, Lua scripts, retries and a dead-letter archive._

**What it is**

relay is a library for running background jobs in Go, in the same family as Sidekiq or asynq. I built it to understand what those tools are actually doing underneath, and kept going until it was something I would use.

- Immediate, delayed (ProcessIn and ProcessAt) and recurring cron jobs
- Retries with exponential backoff, then a dead-letter archive
- Weighted priority queues that can be paused and resumed
- Optional deduplication, per-task timeouts, deadlines and remote cancellation
- Prometheus metrics and a CLI to inspect and manage queues

**Leases instead of acknowledgements**

The core problem is simple to state: if a worker takes a job and then dies, the job must not disappear. Message brokers solve this with acknowledgements. relay does it with a sorted set of leases in Redis.

Dequeuing is one atomic Lua script. It moves the task ID from the pending list to the active list and records a lease that expires at a given time. While the handler runs, a heartbeat pushes the expiry forward. If the worker disappears, the heartbeat stops and the lease runs out.

_Code excerpt from `internal/rdb/scripts.go`: Dequeue and recovery, both atomic on the Redis side_

**Trade-offs**

- At-least-once means a task can run twice, for example if a worker stalls past its lease and then finishes. Handlers need to be idempotent, and the docs say so.
- Recovery runs on an interval, so a crashed task waits up to the lease timeout plus one recovery tick before it is retried.
- Everything depends on one Redis. That keeps the system simple but makes Redis the single point of failure.

**Testing**

The Redis layer has unit tests for each script, including one that dequeues with an already-expired lease and checks that recovery puts the task back. There are also integration tests that run a real server against Redis.

### syncset-db (Software) · Postgres replication tool · Released on PyPI · Jan 2026 – Feb 2026

**Summary:** A small Python tool that copies only the tables and columns you choose from one PostgreSQL database to one or more replicas. It came from needing to share part of a database with another service without copying all of it.

**What was interesting:** It keeps replica schemas in step with the primary, syncs incrementally using a high-watermark on the primary key and can compare row checksums to skip rows that haven't changed. It doesn't do change data capture yet, so updates to old rows are only caught when checksums are on.

**My part:** Solo project, published on PyPI.

**Stack:** Python, PostgreSQL, SQLAlchemy, YAML

**Links:** [Source](https://github.com/MohamedAklamaash/syncset) · [PyPI](https://pypi.org/project/syncset-db/) · [Write-up](/posts/why-i-built-syncset-db)

### redharness (AI/ML) · LLM robustness benchmark · v0.1.0 on PyPI · May 2026 – Jun 2026

**Summary:** A benchmark for how well language models hold up against jailbreaks, prompt injection and data leakage. I started it after noticing that the same attack could get very different success rates depending on the dataset version and on who, or what, graded it.

**What was interesting:** It standardises the evaluation, not the attack. Every result records the dataset version, the judge and the metric that produced it. In the first real run, scoring the same PAIR transcripts with a string-match judge gave an attack success rate of 1.00, and a rubric grader gave 0.15.

**My part:** Solo project. I designed the methodology and wrote the harness, plugins, tests and documentation.

**Stack:** Python, LLM evaluation, OpenAI API, Anthropic API, Streamlit, mypy

**Links:** [Source](https://github.com/MohamedAklamaash/redharness) · [PyPI](https://pypi.org/project/redharness/) · [Write-up](/posts/why-i-built-redharness)

- 1.00 vs 0.15: PAIR attack success, string-match vs rubric judge, same transcripts
- 3: threat surfaces under one methodology

#### Case study: redharness: LLM robustness benchmark

_Methodology, judge sensitivity and first results from redharness, a benchmark for LLM jailbreak, prompt-injection and data-leakage evaluation with per-result provenance._

**Problem**

LLM safety papers report attack success rates that are hard to compare. One paper says 90%, another says 15% for what sounds like the same attack on the same model. Most of the gap comes from three places: what counts as success, which behaviours were tested and which judge decided. StrongREJECT (Souly et al., 2024) showed that weak judges systematically inflate jailbreak success.

The benchmarks that people actually adopted, like HarmBench and JailbreakBench, won by fixing the evaluation: fixed behaviours, fixed judges and versioned artifacts. redharness tries to apply the same idea across three surfaces at once, including prompt injection and data leakage, which are much less standardised.

**Approach**

An evaluation is a grid over five pluggable parts. A run goes through every cell of the grid and scores it. Agentic prompt injection adds two more parts: a sandboxed tool scenario and the injection itself.

- 1. Dataset: Versioned, hash-pinned behaviours
- 2. Attack: static, template, PAIR, TAP, crescendo
- 3. Target: The model or agent under test
- 4. Judge: String match, StrongREJECT rubric, leak detectors
- 5. Metric: ASR, refusal rate, false refusal rate, cost

- Datasets are checked against a SHA-256 hash before use and are never committed to the repository.
- Runs are seeded, attempts are cached on their fully resolved parameters and every prompt and response is saved as JSONL.
- Plugins are looked up by name from YAML through a closed registry, so a config file can't execute code.
- The core runs fully offline against deterministic targets. Live models, real datasets and heavier frameworks are opt-in extras, and CI checks that the core stays offline.

**First real-model results**

The first end-to-end run used claude-haiku-4-5 as the target and gpt-4o-mini as the attacker and grader, on commit-pinned public datasets. The leaderboards are committed to the repository.

| Evaluation | Result | What it shows |
|---|---|---|
| AdvBench, direct (static) | ASR 0.00, refusal rate 1.00 | Aligned models refuse direct harmful requests |
| AdvBench, PAIR | ASR 0.15 (StrongREJECT) vs 1.00 (string match) | Same transcripts, about 6.7× apart depending on the judge |
| XSTest, safe split | False refusal rate 0.00 | No over-refusal of benign prompts |

_Results as reported in the repository (results/real_eval_v1)_

**Limitations**

- One target model so far, so these are a fidelity check rather than a leaderboard.
- Local classifier judges (Llama Guard, WildGuard, the HarmBench classifier) are not integrated yet.
- GCG, garak and PyRIT are registered as scaffolds. Their heavy dependencies aren't verified in CI.
- The bundled synthetic datasets show how the harness works. Their numbers say nothing about any real model's safety.

### nanocoder-math (AI/ML) · Language model from scratch · Research project · Apr 2026 – Jun 2026

**Summary:** A small decoder-only GPT for code and maths, trained from scratch on a single laptop. The question was how much a small model can learn when the tokeniser, data, model, optimiser and evaluation all have to run on one machine.

**What was interesting:** Each lever was tested as a controlled ablation. Switching from AdamW to Muon lowered validation perplexity from 645 to 539 at the same token budget, and a verified synthetic arithmetic corpus did far more for maths ability than scale could at this size.

**My part:** Solo project. I wrote the model, tokeniser, data pipeline, Muon implementation and evaluation code in plain PyTorch.

**Stack:** Python, PyTorch, Transformers, BPE, Muon, GRPO, SymPy

**Links:** [Source](https://github.com/MohamedAklamaash/nanocoder-math)

- 645 → 539: validation perplexity, AdamW → Muon, same tokens
- 83.2%: exact match on single-digit arithmetic

#### Case study: nanocoder-math: a small GPT from scratch

_A from-scratch decoder-only language model for code and maths with controlled ablations on optimiser, data and architecture, including Muon vs AdamW and GRPO with a verifiable reward._

**Question**

How much can a small language model learn when everything has to run on one machine? I couldn't scale tokens or parameters, so the project looks at the levers that are left: data quality, optimiser efficiency and architecture choices. Each one was tested on its own.

It started as a reimplementation of the original encoder-decoder Transformer (Vaswani et al., 2017), which is still in the repository, and was rebuilt into a decoder-only model.

**Setup**

- Pre-norm decoder-only Transformer with RoPE, SwiGLU and tied embeddings. Positional encoding, norm placement, activation, QK-norm and logit soft-capping can each be switched for ablations.
- Two sizes: tiny (16.8M parameters) and small (33.9M), both with a 1024-token context.
- A byte-level BPE tokeniser with 16k merges, trained on the target corpus. At this size a 50k vocabulary would take up too much of the parameter budget.
- Streaming data from public datasets (codeparrot-clean and open-web-math) into memory-mapped uint16 shards, with the code-to-maths mix set at training time.
- A procedurally generated arithmetic and algebra corpus where every example is checked with SymPy, or by running it for code, before it is used.
- Developed on an Apple M4 (MPS, fp32). A single device module picks bf16 with torch.compile on modern CUDA and fp16 with loss scaling on older GPUs.

**Results**

All numbers are from the repository README, measured on a single Apple M4 with 24 GB of memory.

| Experiment | Baseline | Result |
|---|---|---|
| Optimiser (tiny model, equal tokens) | AdamW: val PPL 645 | Muon: val PPL 539 |
| Synthetic arithmetic corpus | ~0% on GSM8K and HumanEval at this scale | 31.2% exact match overall, 83.2% single-digit |
| GRPO with an exact arithmetic verifier | 53.8% overall, 93.0% single-digit | 57.4% overall, 98.4% single-digit |
| MLX port, benchmarked first | PyTorch-MPS throughput | 1.05× (below the 1.5× bar set in advance, so not ported) |

_Controlled comparisons_

**Things I learned the hard way**

- On Apple's Metal backend, fp16 autocast was slower than fp32, not faster.
- Non-blocking host-to-device copies on MPS raced and corrupted batches. The code now avoids them.
- Deciding the bar for the MLX port before measuring it made it easy to drop. Writing that negative result down was more useful than another half-finished port.

**Limitations**

- The models are tiny, so results are about relative changes, not absolute capability.
- GSM8K and HumanEval stay near zero at this scale. The arithmetic results come from a matched synthetic test set.
- There is no automated test suite yet. Reproducibility comes from the scripted commands in the README.

### codegraph (AI/ML) · AI codebase explorer · Working prototype · Apr 2026 – Jun 2026

**Summary:** Give it a GitHub repository and it builds a graph of the codebase, where every function is a node and every call is an edge. You can explore the graph or ask questions like "where is billing handled?" and get answers grounded in the actual code.

**What was interesting:** The function whose name matches your question is often just a thin wrapper, and the real logic lives in what it calls. So codegraph finds the closest matching functions with vector search and then follows the call graph one step further before answering. That way the answer includes the code that actually does the work.

**My part:** Solo project. I built the parser, the graph and embedding pipeline, the chat API and the React front end.

**Stack:** Python, Django, PostgreSQL, pgvector, Gemini embeddings, SSE, React, Docker

**Links:** [Source](https://github.com/MohamedAklamaash/codegraph)

#### Case study: codegraph: ask questions about a codebase

_How codegraph parses a repository into a function call graph, embeds each function into pgvector and follows call edges from the closest matches to answer questions about the code._

**Problem**

Reading an unfamiliar codebase usually means a lot of grepping. Asking an LLM helps only if you give it the right code, and that's harder than it sounds: the function whose name matches your question is often a thin wrapper, and the logic lives in what it calls.

**Pipeline**

Python is parsed with the standard library's ast module. The other languages (JavaScript, TypeScript, Go, Rust, Java, C, C++ and Kotlin) use lighter regex and brace matching, which is less precise but good enough to build a useful call graph.

- 1. Clone: Public or private repo through GitHub OAuth
- 2. Parse: Functions and the calls inside them, across 9 languages
- 3. Store: Function nodes and call edges in PostgreSQL
- 4. Embed: Each function embedded with Gemini into pgvector
- 5. Find: 8 closest functions by vector search, plus the functions they call
- 6. Answer: Grounded response streamed over SSE

**Finding the right code**

- Every query is scoped to one repository, including the edge expansion, so a stray edge can't pull in another repository's code.
- Embedding calls are batched, run in parallel and retried on transient API errors.

_Code excerpt from `backend/apps/chat/views.py`: Start from vector search, then follow the call graph one step_

**What's missing**

- I haven't measured answer quality yet against a set of questions with known answers, so I can't say how much following the call graph helps compared with vector search alone.
- Regex-based parsing misses some calls in non-Python languages. Moving to tree-sitter would fix most of that.

### RAMPART (AI/ML) · Multi-agent RL research · Research, simulation only · Mar 2026 – Jun 2026

**Summary:** A study of whether a set of specialist portfolio strategies, coordinated by a regime-aware router, can beat a single reinforcement learning agent and simple baselines out of sample, after costs. It runs on synthetic prices and never places real trades.

**What was interesting:** The evaluation harness was built first. Purged walk-forward backtests, realistic costs and honest baselines meant that coordination won on trending data (Sharpe about 1.19 vs 0.83 for equal weight) but lost under fast regime switching. Both results are reported.

**My part:** Solo project. I built the router, the specialist strategies, the risk checks, the backtester and the small UI.

**Stack:** Python, PyTorch, Stable-Baselines3 (PPO), Gymnasium, pandas, FastAPI, React

**Links:** [Source](https://github.com/MohamedAklamaash/RAMPART)

- 1.19 vs 0.83: Sharpe, soft blending vs 1/N, single-trend regime
- −0.52 vs 0.23: Sharpe, soft blending vs 1/N, regime switching

#### Case study: RAMPART: multi-agent portfolio allocation

_A research project on coordinating specialist strategies with a regime-aware router, scored with purged walk-forward backtests against 1/N, a monolithic PPO agent and Markowitz._

**Question**

Can a group of specialist strategies, picked by a router that reads the market regime and checked by deterministic risk rules, do better than one big RL agent or plain equal weighting? This is research on synthetic data. It is not a trading system and not investment advice.

**Design**

Decisions about money are deterministic and checked. A separate language layer only turns a natural-language goal into a mandate and explains the result afterwards. It never touches allocations.

- 1. Router: Trend and volatility regime, with confidence and hysteresis
- 2. Specialists: Momentum, Markowitz, risk parity, min variance, defensive cash, PPO
- 3. Verifier: Feasibility, concentration cap and turnover budget, then repair or fall back
- 4. Allocation: Weights plus the regime, specialist and guardrail status behind them

- Hard routing picks one specialist. Soft blending mixes them by a smoothed regime probability.
- The explanation is checked against the actual weights, regime and top holding before it is shown.

**Evaluation**

- Purged, embargoed walk-forward splits to avoid leaking training data into tests.
- Costs include the bid-ask spread, commission and square-root market impact.
- Baselines: buy-and-hold, equal weight (1/N) and Markowitz. An ablation compares the coordinator with the monolithic RL agent, the best single specialist in hindsight and 1/N.
- Seeded end to end. Missing or infinite values raise an error instead of being filled with zeros.

**Results**

Coordination helps when regimes persist. When they switch quickly, the blend keeps reweighting and the turnover costs more than diversification gives back. Equal weighting is known to be hard to beat (DeMiguel, Garlappi and Uppal, 2009), and this reproduces that.

| Data | Soft blending | Hard routing | 1/N | Monolithic PPO |
|---|---|---|---|---|
| Single-trend regime | ≈ 1.19 | – | 0.83 | −0.76 |
| Regime switching | ≈ −0.52 | ≈ −0.44 | 0.23 | – |

_Out-of-sample Sharpe after costs, as reported in the repository_

**Limitations**

- Prices are synthetic, so regimes are a property of the generator, not of a real market.
- The regime detector is a simple classifier and lags by design.
- The PPO specialist does worse than the classical strategies on this data.
- There is no order-book simulation. Execution realism stops at the cost model.

### patternix (AI/ML) · Paper implementation · Complete · Mar 2026 – Apr 2026

**Summary:** An implementation of reservoir pattern sampling for data streams, from Giacometti and Soulet's paper, applied to the Online Retail transactions dataset. It keeps a bounded sample of frequent itemsets as transactions stream in.

**What was interesting:** Three variants: all-time, sliding window and exponential decay. They are compared with FP-Growth on recall, runtime and memory. On 10k transactions with k = 500, each variant runs in about 0.1 s.

**My part:** Solo implementation of the paper, plus the evaluation script.

**Stack:** Python, pandas, Streaming algorithms, Frequent pattern mining

**Links:** [Source](https://github.com/MohamedAklamaash/patternix)

