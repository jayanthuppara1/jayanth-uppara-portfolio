# Jayanth Uppara Portfolio

Interactive personal portfolio website for Jayanth Uppara (Product Engineer / Full-Stack Software Engineer, Tampa FL) with a coffee-themed dark espresso design.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port via $PORT, root path `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (path `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- Required env: none (pure static frontend)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4 + framer-motion + lucide-react
- Fonts: Playfair Display (serif/headings) + DM Sans (body) + JetBrains Mono (labels)
- No database — all content hardcoded in Home.tsx

## Where things live

- `artifacts/portfolio/src/pages/Home.tsx` — full portfolio (all sections, inline components)
- `artifacts/portfolio/src/index.css` — Tailwind v4 @theme inline: coffee palette tokens (`--color-coffee-latte`, `--color-coffee-bronze`, etc.) usable as `text-coffee-latte`, `bg-coffee-bronze`. Also defines steam/bob keyframes.
- `artifacts/portfolio/src/components/CoffeeMugLetter.tsx` — SVG "J" styled as coffee mug with hover steam
- `artifacts/portfolio/src/components/HeroParticles.tsx` — canvas particle bg (warm latte/bronze palette)
- `artifacts/portfolio/src/components/CustomCursor.tsx` — latte-colored animated cursor
- `artifacts/portfolio/src/assets/` — AI-generated project card images
- `artifacts/portfolio/vite.config.ts` — framer-motion in `resolve.dedupe`, @assets alias
- `artifacts/portfolio/public/JayanthUppara_Resume.pdf` — actual resume PDF

## Architecture decisions

- Pure frontend SPA — no backend, no API calls
- Coffee palette: espresso `#1a0e08`, latte `#c9a97a`, bronze `#a0622a` as Tailwind v4 tokens
- framer-motion **must stay** in `resolve.dedupe` — removing it causes "Cannot read properties of null (reading 'useRef')" at runtime
- STAGGER_CHILDREN variants must NOT use `ease: "easeOut"` string — Framer Motion rejects plain string easing
- Single Home.tsx with all sections inline; data constants (PROJECTS, EDUCATION, CERTS, SKILL_CATEGORIES, EXPERIENCE_JOBS) at top; sub-components (FlipCard, CertBadge, EducationCard, ExperienceTimeline, SteamDeco) defined before MetricCard

## Product

- **Hero**: Two-column (text left, animated coffee cup illustration right); CoffeeMugLetter SVG replaces the "J"; rotating speech bubble taglines; 4 CTA buttons (View Projects, Resume ↓, GitHub, LinkedIn)
- **Experience**: Vertical timeline — FTB, USF, Cognizant, Samsung; click to expand; colored dot per company
- **Projects**: 3D flip cards (click to flip); front shows image/title; back shows description, full tech stack, links
- **Skills**: 6 categories (Backend, Frontend, Cloud, Databases, BI & Analytics, AI Tools); hover-lift chips
- **Education**: Expandable cards (click ▾ to reveal coursework + narrative); AnimatePresence height animation
- **Certifications**: Stamp/spring badges (AWS, PL-300); scale+rotate spring on scroll-into-view
- **Contact**: mailto, LinkedIn, GitHub, resume download
- **Metrics Snapshot**: Animated counters (4+ yrs, 2 degrees, 3+ certs, 5+ projects…)

## User preferences

- Name: Jayanth Uppara | Tampa, FL | jayanthuppara999@gmail.com | 656-203-4661
- LinkedIn: linkedin.com/in/jayanthu | GitHub: github.com/jayanthu
- No emojis in the UI (speech bubble taglines are an exception by design)

## Gotchas

- framer-motion must stay in `resolve.dedupe` in vite.config.ts
- Tailwind v4: no tailwind.config.ts — all theme config is inside `@theme inline` in index.css
- Steam animation CSS classes (`.mug-steam-1/2/3`) rely on the `steam-waft` keyframe in index.css

## Pointers

- See the `react-vite` skill for frontend conventions
- See the `design` skill for delegating UI work to DESIGN subagent
