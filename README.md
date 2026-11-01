# Mohamed Aklamaash: Portfolio

My personal site, live at **[aklamaash.me](https://aklamaash.me)**.

One identity, two profiles:

- [`/`](https://aklamaash.me): who I am and where to go next
- [`/software`](https://aklamaash.me/software): backend, distributed systems and cloud infrastructure
- [`/ai`](https://aklamaash.me/ai): machine learning, LLM evaluation and information retrieval

Plus case studies at `/projects/[slug]` and writing at `/posts`.

## Editing content

All copy lives in typed modules under `src/content/`, separate from the UI:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, links, education, resume paths |
| `profiles.ts` | Homepage copy, Tale Analytics, both profile intros and technical areas |
| `experience.ts` | Experience, shared by every page |
| `projects.ts` | Every project, including case-study sections |
| `content/*.mdx` | Blog posts (Contentlayer) |

After editing, run `pnpm content:md` to regenerate `CONTENT.md`, a plain-text copy for review.

Other docs: `PORTFOLIO_AUDIT.md` (audit and plan), `PROJECT_CURATION.md` (why each project is in or out), `TODO.md` (things to confirm).

## Stack

- [Next.js 15](https://nextjs.org/) (Pages Router), fully static except `sitemap.xml`
- [Tailwind CSS](https://tailwindcss.com/), Geist (self-hosted, Latin subset)
- [Contentlayer](https://www.contentlayer.dev/) + MDX for posts
- [Vercel Analytics](https://vercel.com/analytics)

No animation or UI libraries. Icons are inline SVG.

## Getting started

Requires Node 18+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build Contentlayer + the production bundle |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm content:md` | Regenerate `CONTENT.md` from `src/content` |

For local Lighthouse runs, build with `NEXT_PUBLIC_DISABLE_ANALYTICS=1` so the Vercel Analytics script (which only exists on Vercel) doesn't 404.

---

The code is here to learn from. The content, copy and likeness are mine, so please don't redeploy it as your own. Otherwise, take whatever ideas are useful.
