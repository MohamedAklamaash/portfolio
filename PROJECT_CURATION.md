# Project curation

Every project shown on the site before the redesign, what I checked for each and whether it stays.

**How the projects were reviewed.** All 11 linked repositories were cloned (shallow, default branch) on 2026-11-01. For each one I read the README and docs, the directory layout, the core modules and the test suite, and counted source lines (Python/Go/TS/JS, excluding lockfiles). Nothing was run against live services. Claims on the site are limited to what the code or the repository's own documented results support.

**Scoring** (1 to 5): depth = technical depth and engineering complexity, orig = originality, use = practical usefulness, impl = implementation quality (tests, docs, structure), fit = relevance to the target roles, evid = evidence of real work.

## Summary

| # | Project | Category | depth | orig | use | impl | fit | evid | Decision |
|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|---|
| – | Tale Analytics | Software | n/a | n/a | n/a | n/a | 5 | product | **Featured on /software** |
| 1 | Launchpad | Software | 5 | 4 | 4 | 5 | 5 | 5 | **Keep** (case study) |
| 2 | relay | Software | 4 | 3 | 4 | 4 | 5 | 4 | **Keep** (case study) |
| 3 | syncset-db | Software | 3 | 3 | 3 | 2 | 4 | 3 | **Keep** (compact) |
| 4 | redharness | AI/ML | 5 | 4 | 4 | 5 | 5 | 5 | **Keep** (case study) |
| 5 | nanocoder-math | AI/ML | 5 | 3 | 3 | 4 | 5 | 5 | **Keep** (case study) |
| 6 | RAMPART | AI/ML | 4 | 4 | 2 | 4 | 4 | 4 | **Keep** (case study) |
| 7 | codegraph | AI/ML | 4 | 3 | 4 | 4 | 5 | 4 | **Keep** (case study) |
| 8 | patternix | AI/ML | 2 | 2 | 2 | 2 | 3 | 3 | **Keep** (compact, paper implementation) |
| 9 | Voice Opinion | Software | 3 | 2 | 2 | 2 | 2 | 3 | Remove from presentation |
| 10 | MANAGE_MONEY | Software | 2 | 2 | 3 | 2 | 1 | 3 | Remove from presentation |
| 11 | SmartScreenshot | AI/ML | 2 | 3 | 3 | 2 | 2 | 1 | Remove from presentation |

**Final selection**

- **Software Engineering (4 + Tale Analytics):** Tale Analytics (featured product), Launchpad, relay, syncset-db.
- **AI and Machine Learning (5):** redharness, nanocoder-math, codegraph, RAMPART, patternix.

The software list stops at four projects plus Tale Analytics. Voice Opinion was the only other candidate, and it doesn't hold up next to Launchpad and relay. I left the slot empty rather than fill it.

No project appears on both profiles. codegraph is on the SDE resume, but its most interesting part is the retrieval step (vector search plus call-graph expansion), so it goes on `/ai`. `/software` links to it from its "elsewhere" line instead of repeating it.

## Details

### Tale Analytics
- **Category:** Software (featured product)
- **Existing description:** none (it wasn't on the site)
- **Link:** https://app.aklamaash.me
- **Evidence reviewed:** only the description in the brief. I did not open or inspect the application, and no screenshot exists in the repository.
- **Recommendation:** Featured block at the top of the `/software` projects section, marked "In development", with the app link and no invented metrics or images. The content lives in `src/content/projects.ts`, ready for a case study later.

### Launchpad
- **Category:** Software
- **Existing description:** "Self-hosted deployment platform that turns a GitHub repo into a running ECS service in your own AWS account."
- **Links:** https://github.com/MohamedAklamaash/launchpad · https://launchpad-five-lilac.vercel.app · post `/posts/why-i-built-launchpad`
- **Evidence reviewed:** about 126k lines across a gateway service, identity service, payment service and two deployment services (application + infrastructure), each a Django app with its own worker. 276 test files. Terraform modules for VPC, ECS, ALB, ECR and EKS (Auto Mode). RabbitMQ via `pika` and Redis-backed job queues. Docs on edge cases, IAM policies, DNS isolation and an EKS implementation-status record. A real dashboard screenshot is in `public/projects/launchpad.png`.
- **Technical depth:** The strongest software project. Cross-account IAM role assumption, an async multi-step deploy pipeline, Terraform per tenant, path-based ALB routing with an NGINX sidecar, and a second compute target (EKS).
- **Decision:** Keep as the lead software project, with a case study.

### relay
- **Category:** Software
- **Existing description:** "A distributed job scheduler for Go, backed by Redis — at-least-once delivery, crash recovery via visibility-timeout leases…"
- **Link:** https://github.com/MohamedAklamaash/relay (docs: https://mohamedaklamaash.github.io/relay/)
- **Evidence reviewed:** about 2.4k lines of Go. Client, server, processor, scheduler, recoverer, forwarder and inspector, an `internal/rdb` Redis layer, a CLI and a worker binary, unit and integration tests, a changelog and a docs site.
- **Technical depth:** Shows real distributed-systems thinking: lease-based recovery, at-least-once semantics, retries with a dead-letter archive, weighted queues. It follows the asynq/Sidekiq design space, which the README says openly.
- **Decision:** Keep, with a case study.

### syncset-db
- **Category:** Software
- **Existing description:** "Python library for selective PostgreSQL table/column replication with schema drift detection and crash-safe sync."
- **Links:** https://github.com/MohamedAklamaash/syncset · https://pypi.org/project/syncset-db/ · post `/posts/why-i-built-syncset-db`
- **Evidence reviewed:** about 440 lines of Python. YAML config, column mapping, schema reflection and diff, high-watermark incremental sync persisted to a state file, optional row checksums, parallel sync to several replicas, CLI with dry-run. Published on PyPI. No tests.
- **Technical depth:** Moderate and focused. Its limits are real: high-watermark on the primary key won't catch updates to old rows unless checksums are on, and CDC is listed as future work. The site says this plainly.
- **Decision:** Keep as a compact entry. It's a real, published tool that fits the database/backend story.

### redharness
- **Category:** AI/ML
- **Existing description:** "A standardized, reproducible benchmark for LLM adversarial robustness across jailbreak, prompt-injection, and data-leakage…"
- **Links:** https://github.com/MohamedAklamaash/redharness · https://pypi.org/project/redharness/ · post `/posts/why-i-built-redharness`
- **Evidence reviewed:** about 13k lines of typed Python, 46 test files, CI, configs, `CITATIONS.bib`, a changelog, and committed results under `results/real_eval_v1`. The README reports a first real-model run: AdvBench direct ASR 0.00, PAIR ASR 0.15 with a StrongREJECT grader vs 1.00 with string match on the same transcripts, and XSTest safe split FRR 0.00.
- **Technical depth:** High. Evaluation methodology, judge sensitivity, reproducibility contract, three threat surfaces.
- **Decision:** Keep as the lead AI project, with a case study. Results are quoted exactly as the repository reports them.

### nanocoder-math
- **Category:** AI/ML
- **Existing description:** "A decoder-only GPT trained from scratch for code & math under single-device compute…"
- **Link:** https://github.com/MohamedAklamaash/nanocoder-math
- **Evidence reviewed:** about 3.2k lines of PyTorch. Model, tokenizer, streaming data pipeline, Muon optimiser, device/precision layer, benchmark scripts, and a legacy encoder-decoder reimplementation. The README reports: Muon vs AdamW validation PPL 645 → 539 at equal tokens; synthetic arithmetic exact-match 31.2% overall and 83.2% single-digit; GRPO with an exact verifier 53.8% → 57.4% overall and 93.0% → 98.4% single-digit; an MLX port rejected after measuring 1.05× speed-up against a 1.5× bar. No automated tests.
- **Technical depth:** High for a single-device project. Real ablations and a reported negative result.
- **Decision:** Keep, with a case study.

### RAMPART
- **Category:** AI/ML
- **Existing description:** "Regime-aware multi-agent portfolio allocation — a supervisor routes capital across specialist strategies…"
- **Link:** https://github.com/MohamedAklamaash/RAMPART
- **Evidence reviewed:** about 5k lines of Python and a small React front end, 29 test files. Regime router, six specialists including a PPO policy (stable-baselines3), a deterministic verifier, purged walk-forward backtests, a cost model, and an ablation make target. The README reports Sharpe on synthetic data: single-trend regime, soft blending ≈ 1.19 vs 1/N 0.83 vs monolithic RL −0.76; regime-switching, blending ≈ −0.52 vs 1/N 0.23.
- **Technical depth:** Good experiment design and an honest negative result. Prices are synthetic, which limits practical usefulness.
- **Decision:** Keep, with a case study. It is clearly labelled as research and simulation only.

### codegraph
- **Category:** AI/ML (retrieval)
- **Existing description:** "Turns any GitHub repository into an interactive code knowledge graph…"
- **Link:** https://github.com/MohamedAklamaash/codegraph
- **Evidence reviewed:** about 6.6k lines. Django REST backend with GitHub OAuth, a parser (Python `ast` for Python, regex and brace matching for the other languages), function nodes and call edges in PostgreSQL, Gemini embeddings (3072-dim) in pgvector, and chat retrieval that takes the top 8 by L2 distance, expands one hop along call edges, then streams a grounded answer over SSE. React front end. 17 test files. A real screenshot is in `public/projects/codegraph.png`.
- **Technical depth:** Good. Graph-expanded dense retrieval is a real IR idea. There is no retrieval evaluation yet, and the site says so.
- **Decision:** Keep on `/ai`, with a case study.

### patternix
- **Category:** AI/ML (data mining)
- **Existing description:** "Reservoir-based frequent-pattern mining for data streams…"
- **Link:** https://github.com/MohamedAklamaash/patternix
- **Evidence reviewed:** about 650 lines of Python. An implementation of the ResPat family from Giacometti & Soulet ("Reservoir Pattern Sampling in Data Streams") with landmark, sliding-window and exponential-decay variants, on the Online Retail dataset, compared against FP-Growth in an evaluation script that writes plots to `results/`.
- **Technical depth:** Modest. It is a faithful paper reimplementation, probably close to coursework.
- **Decision:** Keep as a compact entry, presented honestly as a paper implementation. It is the only project showing classical data mining and streaming algorithms, which fits the Data Science background. It is the first to drop if a stronger AI project comes along.

### Voice Opinion: removed
- **Category:** Software
- **Link:** https://github.com/MohamedAklamaash/voice-opinion
- **Evidence reviewed:** about 3.6k lines of TS. React client, Express + Socket.io server, WebRTC mesh signalling, MongoDB. No tests.
- **Reason:** A competent real-time app, but it is mostly product features (rooms, invites, chat) on a standard stack. It shows less backend or infrastructure depth than Launchpad or relay, and it would dilute the software list.

### MANAGE_MONEY (ManageMoneyWithAI): removed
- **Category:** Software
- **Links:** https://github.com/MohamedAklamaash/ManageMoneyWithAI · https://manage-money-with-ai.vercel.app/ · post `/posts/why-i-built-managemoney`
- **Evidence reviewed:** about 5.8k lines of JS/JSX. A Next.js app with Prisma and PostgreSQL, Gemini receipt parsing and Inngest jobs. No tests. The old card said "GPT-4", but the code uses Gemini.
- **Reason:** Mostly CRUD with one LLM call, and the oldest work here (2024). The blog post stays live at its URL but is no longer linked from the profiles.

### SmartScreenshot: removed
- **Category:** AI/ML
- **Link:** https://github.com/luqmaan-k/SmartScreenshot (someone else's repository)
- **Evidence reviewed:** about 900 lines of Python. A GTK screenshot tool that blurs text detected by Tesseract OCR. The repo belongs to `luqmaan-k`. I could not work out from a shallow clone which parts were yours.
- **Reason:** It's a small collaborative tool with standard OCR and no model work, and your contribution can't be confirmed. If you contributed a lot, it could come back as a compact entry. See `TODO.md`.
