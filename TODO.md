# Things to confirm

Things I couldn't verify from the repository, the resumes or the project code. The site currently uses the safest option for each one.

## Experience

1. **Unbound Security dates.** The brief lists a single role, "Software Engineering Intern, May 2026 – June 2026", covering AWS migration, billing, security tooling and Kubernetes. Both resumes and the old site show **two** roles: May 2025 – Dec 2025 (GCP to AWS migration, billing, DLP accuracy, governance analytics) and a summer role May 2026 – Jun 2026 (TruffleHog DLP, BYOC on EKS, Authentik, Prometheus/Grafana). The AWS migration and billing work is dated 2025 on both resumes, so the site shows both roles. **Please confirm the dates.** Edit `src/content/experience.ts`.
2. **Unbound's website.** The old site used both `getunbound.ai` and `unboundsecurity.ai`. The site now links to `https://getunbound.ai/`. Confirm which is current.
3. **Unbound one-liner.** I described the company as "a security platform that helps companies control how their employees and AI agents use AI tools". That's based on the DLP and AI-usage-governance work in your bullets. Adjust it if it's not how Unbound describes itself, or if any of the internship details shouldn't be public.
4. **Notification service.** "Built a low-latency notification service" was on the old site but isn't on either current resume. I kept it. Remove it if it's no longer accurate.

## Education

5. **CGPA.** Both current resumes say 8.18/10. The older `public/resume.pdf` says 9.36/10. The site shows no CGPA. Add one if you want it, in `src/content/site.ts`.
6. **`public/resume.pdf` is outdated.** It only lists the 2025 internship and the old CGPA, and `/resume` still 308-redirects to it, as it always has. The site itself links only to the two current resumes. I'd replace `resume.pdf` with a copy of the SDE resume. I didn't overwrite the file without asking.

## Tale Analytics

7. **Copy.** It uses the description from your brief, lightly edited, plus one paragraph about it being the first thing you've built for real users. Check that second paragraph is true. See `TALE` in `src/content/profiles.ts`.
8. **Screenshot.** None exists in the repo, so none is shown. If you add one to `public/projects/`, add an `image` to the Tale block the same way as Launchpad.
9. **Your role.** The brief says "a product I'm working on". If others are involved, or it belongs to a company, the wording ("Product I'm building") should say so.

## Projects

10. **Launchpad live site** (`launchpad-five-lilac.vercel.app`) and **relay docs** (`mohamedaklamaash.github.io/relay`). I couldn't reach them from the build environment (outbound network was restricted). Please click through once.
11. **Removed from the profiles:** Voice Opinion, ManageMoney and SmartScreenshot. The reasons are in `PROJECT_CURATION.md`. The ManageMoney blog post is still live at its URL and listed under Writing. Delete `content/why-i-built-managemoney.mdx` if you'd rather it went too.
12. **AI frameworks on the AI resume.** The AI resume lists LangChain, LlamaIndex, LangGraph, CrewAI, AutoGen, Pinecone and others. None of these show up in the selected projects, so the `/ai` skills list leaves them out. If you used them in real work, tell me where and I'll add them with a "used in" note.
13. **Kafka** is listed under Data and messaging on `/software` because it's on your SDE resume, but no project here uses it. Keep it only if you can talk about it in an interview.

## Positioning

14. **"Looking for" lines.** These read "Open to software engineer, backend, platform and infrastructure roles" and "Open to AI engineer, ML engineer and applied AI roles…". Consider adding when you can start (after May 2027? earlier as an intern?) and whether you're open to relocating or remote work.
15. **Location.** The site says Coimbatore, India (where PSG Tech is). Change it in `src/content/site.ts` if you'd rather show Bengaluru or just India.

## After deploying

16. Submit `https://aklamaash.me/sitemap.xml` in Google Search Console and request indexing for `/`, `/software` and `/ai`.
17. Check link previews with LinkedIn's Post Inspector (it caches old OG images).
18. If you don't use Vercel Analytics, remove `@vercel/analytics` from `src/pages/_app.tsx` and `package.json`.
