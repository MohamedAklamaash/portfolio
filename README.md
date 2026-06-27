# Mohamed Aklamaash — Portfolio

My personal site, live at **[aklamaash.me](https://aklamaash.me)**.

A fast, editorial portfolio — with a small interactive terminal you can actually type into.

---

## Highlights

- **A working terminal.** Live in the hero on desktop and as a global overlay everywhere
  (press `` ` `` or use the dock button). Commands: `help`, `whoami`, `ls`, `cd`, `open`,
  `clear` — plus a few easter eggs. Supports history (↑/↓) and tab-completion.
- **Editorial design.** Amber-on-near-black, large serif display type, mono microcopy, a
  grain overlay, and hand-drawn SVG diagrams for the systems and research projects.
- **MDX blog.** Long-form posts authored in MDX and rendered with syntax highlighting.
- **Details that matter.** Smooth scrolling, scroll-reveal that respects
  `prefers-reduced-motion`, SEO + canonical URLs, and a generated sitemap.

---

## Editing content

- **Projects** live in `src/lib/projects.ts`; drop diagrams or screenshots into
  `public/projects/`.
- **Experience and skills** live in `src/lib/constants.ts` and `src/lib/skill-categories.ts`.
- **Blog posts** are `.mdx` files in `content/`.
- **Design tokens** (colors, type, motion) are defined in `src/styles/globals.css`.

---

## Tech stack

- [Next.js 15](https://nextjs.org/) (Pages Router) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [Radix UI](https://www.radix-ui.com/) primitives (shadcn-style)
- [Contentlayer](https://www.contentlayer.dev/) + [MDX](https://mdxjs.com/) for the blog, with [Prism themes](https://github.com/PrismJS/prism-themes)
- [Motion](https://motion.dev/) (Framer Motion) for animation, [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll
- [next-seo](https://github.com/garmeeh/next-seo), [next-themes](https://github.com/pacocoursey/next-themes), [Geist](https://vercel.com/font) + Google Fonts
- [lucide-react](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/), [Vercel Analytics](https://vercel.com/analytics)

---

## Getting started

Requires Node 18+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Start the dev server                       |
| `pnpm build`     | Build Contentlayer + the production bundle |
| `pnpm start`     | Serve the production build                 |
| `pnpm lint`      | Run ESLint                                 |
| `pnpm typecheck` | Type-check with `tsc --noEmit`             |
| `pnpm format`    | Format with Prettier                       |

---

The code is here to learn from. The content, copy, and likeness are mine — please don't
redeploy it as your own. Otherwise, take whatever ideas are useful.
