# Mohamed Aklamaash — Portfolio

My personal site, live at **[aklamaash.me](https://aklamaash.me)**.

It's one codebase that presents two focused versions of me — a **Software** site and an
**AI/ML** site — sharing the same design system but tailored copy, projects, experience,
and skills. There's also a small interactive terminal you can actually type into.

---

## Highlights

- **Two track sub-sites, one codebase.** `/software` and `/ai-ml`, each with its own hero,
  about, projects, experience, and skills. `/` redirects to `/software`. Content is
  filtered per track from a single config.
- **A working terminal.** Live in the hero on desktop and as a global overlay everywhere
  (press `` ` `` or use the dock button). Both views share one session.
  Commands: `help`, `whoami`, `ls`, `cd`, `open`, `switch`, `clear`, `exit` — plus a few
  easter eggs. Supports history (↑/↓) and tab-completion.
- **Editorial design.** Amber-on-near-black, large serif display type, mono microcopy, a
  grain overlay, and hand-drawn SVG diagrams for the research/systems projects.
- **MDX blog.** Long-form posts authored in MDX and rendered with syntax highlighting.
- **Details that matter.** Smooth scrolling, scroll-reveal that respects
  `prefers-reduced-motion`, per-track SEO + canonical URLs, and a generated sitemap.

---

## How the track system works

Everything per-track lives in **`src/lib/tracks.tsx`** — the single source of truth for
copy, SEO, and the selectors that filter content:

- **Projects** are tagged `software` / `research` in `src/lib/projects.ts`; the AI/ML track
  maps to `research`.
- **Skill categories** (`src/lib/skill-categories.ts`) and **experience bullets**
  (`src/lib/constants.ts`) are tagged `software` / `ai-ml` / `both` and filtered per track.
- **Routes** are thin wrappers under `src/pages/{software,ai-ml}/` that render shared
  templates in `src/components/track/`.

To add a project, drop a record into `PROJECTS_DATA` and an image/diagram into
`public/projects/`. To add a post, create an `.mdx` file in `content/`.

---

## Tech stack

- [Next.js 15](https://nextjs.org/) (Pages Router) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [Radix UI](https://www.radix-ui.com/) primitives (shadcn-style)
- [Contentlayer](https://www.contentlayer.dev/) + [MDX](https://mdxjs.com/) for the blog, with [Prism themes](https://github.com/PrismJS/prism-themes)
- [Motion](https://motion.dev/) (Framer Motion) for animation, [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll
- [next-seo](https://github.com/garmeeh/next-seo), [next-themes](https://github.com/pacocoursey/next-themes), [Geist](https://vercel.com/font) + Google Fonts
- [lucide-react](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/), [Vercel Analytics](https://vercel.com/analytics)

---

## Project structure

```
src/
├─ pages/
│  ├─ software/         # Software track routes (thin wrappers)
│  ├─ ai-ml/            # AI/ML track routes
│  ├─ posts/            # shared MDX blog
│  ├─ _app.tsx          # providers, fonts, Lenis, terminal
│  └─ sitemap.xml.ts
├─ components/
│  ├─ hero/             # track-parameterized hero
│  ├─ track/            # per-track page templates
│  ├─ terminal/         # interactive terminal UI
│  ├─ project/          # project card
│  └─ ui/               # primitives
├─ lib/
│  ├─ tracks.tsx        # single source of truth for both tracks
│  ├─ projects.ts       # project data + tech stack
│  ├─ skill-categories.ts
│  ├─ constants.ts      # experience, socials
│  └─ terminal/         # command registry + context
└─ styles/globals.css   # design tokens (colors, type, motion)

content/                # MDX blog posts
public/projects/        # project diagrams (SVG) and screenshots
```

---

## Getting started

Requires Node 18+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/software`.

## Scripts

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Start the dev server                               |
| `pnpm build`     | Build Contentlayer + the production bundle         |
| `pnpm start`     | Serve the production build                          |
| `pnpm lint`      | Run ESLint                                          |
| `pnpm typecheck` | Type-check with `tsc --noEmit`                     |
| `pnpm format`    | Format with Prettier                               |

---

The code is here to learn from. The content, copy, and likeness are mine — please don't
redeploy it as your own. Otherwise, take whatever ideas are useful.
