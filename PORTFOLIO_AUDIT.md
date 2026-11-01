# Portfolio audit

Audit of aklamaash.me as it stood at commit `d1c6d14` (before the redesign). It covers routes, content, design, architecture, SEO, performance and accessibility, and the plan that followed.

## 1. Current state

### Stack

| Area | What was there |
|---|---|
| Framework | Next.js 15.4, Pages Router, React 18.2, TypeScript 5.8 |
| Styling | Tailwind 3.3 plus a large hand-written `globals.css` (CSS variables, amber accent, grain overlay) |
| Content | Projects in `src/lib/projects.ts`, experience in `src/lib/constants.ts`, skills in `src/lib/skill-categories.ts`, per-track copy as JSX in `src/lib/tracks.tsx`, blog posts as MDX via Contentlayer |
| Animation | `motion` (Framer Motion 12), `lenis` smooth scroll, `react-intersection-observer`, mouse-tracked glow and parallax in the hero |
| Fonts | Geist Sans, Geist Mono, plus five Google fonts: Syne, Outfit, Fraunces, JetBrains Mono, Instrument Sans |
| UI libs | Radix (slot, switch, tooltip), class-variance-authority, lucide-react, react-icons, next-themes (forced dark), next-seo |
| Analytics | `@vercel/analytics`; `next-plausible` installed but unused |
| Deployment | Vercel (inferred from Vercel Analytics and `.vercel` in `.gitignore`) |

### Routes

| Route | Behaviour |
|---|---|
| `/` | 307 redirect to `/software`. There was no actual homepage. |
| `/software`, `/software/projects`, `/software/experience`, `/software/skills` | Software track, split into four pages |
| `/ai-ml`, `/ai-ml/projects`, `/ai-ml/experience`, `/ai-ml/skills` | AI/ML track, same four pages |
| `/projects`, `/experience`, `/skills` | 307 to the Software track |
| `/posts`, `/posts/[slug]` | MDX blog, four posts |
| `/terms`, `/privacy` | Placeholder legal pages (needed for third-party app registrations) |
| `/resume` | 308 to `/resume.pdf` (an older resume) |
| `/github`, `/college` | 308 to GitHub and PSG Tech |
| `/sitemap.xml` | Rendered on every request through `getServerSideProps` |
| `/robots.txt` | **Missing** (404) |

### Content inventory

- **Projects listed (11):** redharness, nanocoder-math, RAMPART, Launchpad, relay, codegraph, syncset-db, patternix, Voice Opinion, MANAGE_MONEY, SmartScreenshot. All 11 repositories were cloned and reviewed (see `PROJECT_CURATION.md`).
- **Experience:** two Unbound Security (YC S24) internships: May 2025 to Dec 2025, and a summer role from May 2026 to Jun 2026. The bullets match the two resumes in `public/`.
- **Education:** integrated M.Sc. Data Science at PSG College of Technology, expected 2027.
- **Writing:** four "why I built" posts (Launchpad, redharness, syncset-db, ManageMoney).
- **Resumes:** `Aklamaash_Resume_SDE.pdf`, `Aklamaash_Resume_AI.pdf` and an older `resume.pdf`.
- **Images:** `me.png` (1254×1254, 2.2 MB), real screenshots for Launchpad and CodeGraph, hand-drawn SVG diagrams for relay, redharness, nanocoder-math, RAMPART, patternix and syncset. Six PNGs in `public/projects/` (alumnimeet, allocation, friends, psgfoundation, sonic, stubhub, about 5 MB in total) were not referenced anywhere.

## 2. Problems identified

### Information architecture
1. `/` had no content and redirected, so the root domain (the URL most people search for) had no indexable page about the person.
2. Each track was split across four thin pages. Recruiters had to click through to see experience, and search engines got eight similar, thin pages instead of two strong ones.
3. Experience was split by track at the *bullet* level, so the same job read differently depending on which page you landed on.
4. The AI route was `/ai-ml`. The brief prefers `/ai`.

### Content
1. The copy leaned on stock phrases ("care most about the parts that don't show up in a demo", "honest: reproducible runs", "the part where something is misbehaving") and each track used the same chess paragraph.
2. Project cards were dense with resume-style claims. Some were not quite accurate. For example, codegraph was described as "AST + call-tracing" for 8 languages, but only Python uses a real AST; the other languages use regex and brace matching. MANAGE_MONEY claimed GPT-4 in the description but the code uses Gemini.
3. The tracks had different headline roles in the hero, SEO and terminal ("AI / ML Engineer", "ml-systems · research") but almost the same structure, so `/ai-ml` felt like `/software` with different badges.
4. Tale Analytics, the product currently being built, was not on the site at all.
5. Discrepancies in the source material (CGPA 8.18 vs 9.36, `getunbound.ai` vs `unboundsecurity.ai`, an outdated `resume.pdf`) are listed in `TODO.md`.

### Design
1. The site mixed six type families and leaned on effects: grain overlay, mouse-tracked glow, parallax hero, scroll reveals, a floating dock that hid at the top of the page and a fake terminal. The brief explicitly asks to avoid terminal interfaces and needless scroll animation.
2. Navigation was a bottom dock that only appeared after scrolling. On first load there was no visible navigation.
3. The 404 page was a single image with no text and no link home.

### SEO
1. No page for `/`, no `robots.txt`, and the sitemap listed eight thin track sub-pages.
2. No structured data at all (no Person, WebSite or ProfilePage).
3. Every page shared the default Open Graph image, `me.png`, declared as 1200×630 although it is a 1254×1254 square of 2.2 MB.
4. Post pages had no canonical URLs. Track pages set canonicals, but the four sub-pages per track did not.
5. The `keywords` meta tag was stuffed with 20 terms. Search engines ignore it, so it only adds noise.

### Performance (Lighthouse 12, mobile emulation, production build, local server)

| Page | Perf | A11y | Best practices | SEO | LCP | TBT | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/software` | 59 | 87 | 96 | 100 | 6.0 s | 820 ms | 743 KiB |
| `/ai-ml` | 73 | 87 | 96 | 100 | 5.9 s | 270 ms | 726 KiB |
| `/posts` | 76 | 84 | 96 | 100 | 5.6 s | 200 ms | 705 KiB |

Desktop scores were 98 to 99. The mobile numbers were the problem. Causes:

- **LCP 6 s:** the LCP element was the hero bio paragraph. It was rendered with `opacity: 0` and faded in by Framer Motion after hydration, so it could not paint until the JS had run.
- **TBT 820 ms:** `_app` was 74 KiB (motion, lenis, terminal, react-icons, radix). It shipped to every page, together with a mousemove listener driving springs.
- **Fonts:** seven font families, about 330 KiB of WOFF2, several preloaded.
- **`/posts` bundled every post body** (43 KiB) into the index page because it imported `allContents` on the client instead of passing metadata through `getStaticProps`.
- `favicon.ico` was 64 KiB.

### Accessibility
- `color-contrast` failed (muted text such as `--text-3` on near-black).
- `link-name` failed (icon-only social links).
- Hero content was hidden until animations ran. A 404 page with only an image gave no text alternative to act on.

## 3. Retain

- Next.js Pages Router and static generation. The framework is fine and every content page can be pre-rendered.
- The MDX blog and its four posts (genuine long-form writing with real technical detail).
- The two profile-specific resumes.
- The real screenshots (Launchpad, CodeGraph) and the hand-drawn architecture diagrams, recoloured to the new palette.
- Experience content as written in the resumes, with plainer wording.
- `/terms` and `/privacy` (they exist for third-party app registrations).
- The amber accent as the single brand colour, used far more sparingly.

## 4. Remove

- Terminal UI, Lenis, Motion, react-intersection-observer, the mouse-glow hero, grain overlay and scroll reveals.
- Five of the six font families. Only Geist Sans and Geist Mono stay.
- Radix, class-variance-authority, next-themes, next-seo, react-icons, lucide-react, next-plausible and `@emotion/is-prop-valid`. Icons become a handful of inline SVGs, and SEO is a small in-house `<Seo>` component.
- The track sub-pages, which are folded into one profile page each and redirected to anchors.
- Unreferenced images in `public/projects/`.
- Three projects from the presentation (see `PROJECT_CURATION.md`). The repositories are untouched.

## 5. Proposed information architecture

```
/                      Home: who I am, two paths, current work, experience summary, writing, contact
/software              Software Engineering profile
/ai                    AI and Machine Learning profile
/projects/[slug]       Case studies for projects with enough material
/posts, /posts/[slug]  Writing (unchanged URLs)
/terms, /privacy       Unchanged
```

Each profile page holds intro, selected projects, experience, technical areas, education, a link to the matching resume and a link across to the other profile. Experience is a shared component, so the two profiles can't drift apart. Each profile only changes which highlights it leads with.

**Redirects (all permanent 308):**

| From | To | Why |
|---|---|---|
| `/ai-ml` and `/ai-ml/:path*` | `/ai` | Preferred URL from the brief |
| `/software/projects`, `/software/experience`, `/software/skills` | `/software#projects` etc. | Sub-pages folded into one page |
| `/projects`, `/experience`, `/skills` | `/software#…` | Existing back-compat routes, now permanent |

`/` stops redirecting and becomes a real page. `/resume`, `/github` and `/college` are left unchanged.

## 6. Proposed design direction

- Near-black background (`#0a0a0b`), one raised surface colour, 1 px borders at about 8% white.
- Geist Sans for everything, Geist Mono for small labels, dates and tech lists. Tight type scale (14, 15, 17, 20, 28, 40).
- One accent, a muted amber, used for focus rings, the "current" status marker and link hover. It is not used for large fills.
- Content width of about 720 px for prose and 1040 px for project grids. Generous vertical rhythm with thin section separators.
- Sticky top bar with name, both profiles, writing and resume. It is always visible, keyboard-accessible and fits a 320 px screen.
- Projects use one consistent row layout: name, one-line summary, "what was interesting", stack, status, links. Featured projects get an image or diagram. Tale Analytics gets its own featured block on `/software`.
- Motion limited to colour and border transitions under 150 ms, disabled under `prefers-reduced-motion`.

## 7. Performance and SEO plan

**Performance**
- Zero animation JS. Target under 100 KiB first-load JS (framework + main + a tiny `_app`).
- Two self-hosted variable fonts only, with `display: swap` and a size-adjusted fallback (handled by `next/font`).
- `next/image` with AVIF/WebP and correct `sizes`. Only the above-the-fold avatar is `priority`. Everything else is lazy.
- Posts index gets metadata only through `getStaticProps`.
- Long-lived cache headers for `/projects/*`, the OG images and the PDFs.
- A smaller favicon set.

**SEO**
- Unique title, description, canonical, OG and Twitter tags on every page via one `<Seo>` component fed from `src/content/site.ts`.
- JSON-LD: `WebSite` + `Person` on `/`, `ProfilePage` (with `mainEntity: Person`) on `/software` and `/ai`, `BreadcrumbList` on profile and case-study pages, `CreativeWork`/`SoftwareSourceCode` on case studies, `BlogPosting` on posts.
- `robots.txt` with a sitemap reference, and a sitemap that lists only real canonical URLs.
- Distinct intros, project sets and technical areas on `/software` and `/ai`, so they are not near-duplicates. Experience is shared but framed by a different lead line on each.
- Purpose-made 1200×630 OG images for home, software and AI.

## 8. Results after the redesign

Same method as the baseline: Lighthouse 12.8, production build served locally by `next start`, default mobile emulation (Moto G Power, slow 4G, 4× CPU throttle) and the desktop preset. Built with `NEXT_PUBLIC_DISABLE_ANALYTICS=1` because the Vercel Analytics script only exists on Vercel and returns 404 locally. Real-world numbers on Vercel's CDN should be similar or better, since TTFB there is lower than the simulated 450 ms.

| Page | Mobile perf | A11y | Best practices | SEO | Mobile LCP | Mobile TBT | CLS | Desktop perf |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 100 | 100 | 100 | 100 | 1.9 s | 60 ms | 0 | 100 |
| `/software` | 99 | 100 | 100 | 100 | 2.0 s | 60 ms | 0 | 100 |
| `/ai` | 99 | 100 | 100 | 100 | 2.0 s | 100 ms | 0 | 100 |
| `/projects/launchpad` | 100 | 100 | 100 | 100 | 1.9 s | 30 ms | 0 | 100 |
| `/projects/redharness` | 100 | 100 | 100 | 100 | 1.9 s | 50 ms | 0 | 100 |
| `/posts` | 100 | 100 | 100 | 100 | 1.7 s | 50 ms | 0 | 100 |
| `/posts/why-i-built-launchpad` | 99 | 100 | 100 | 100 | 1.7 s | 130 ms | 0 | 100 |

**Before and after (mobile)**

| | Before (`/software`) | After (`/software`) |
|---|---:|---:|
| Performance | 59 | 99 |
| Accessibility | 87 | 100 |
| LCP | 6.0 s | 2.0 s |
| TBT | 820 ms | 60 ms |
| Transfer size | 743 KiB | 187 KiB |
| First-load JS (build output) | 174 kB | 111 kB |
| Fonts | 7 families, ~330 KiB | 1 variable file, 23 KiB |

**What's left in LCP.** The LCP element on every page is a paragraph of body text. Its time is almost all render delay, waiting for Geist to swap in (`font-display: swap`). Switching to `optional` would bring LCP close to FCP (0.8 s), but first-time visitors on slow connections would see the fallback font for the whole visit. I kept `swap` and cut the font to a 23 KiB Latin subset instead. The remaining JS is mostly React and the Next.js runtime (~78 kB of the 85 kB shared).
