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
- Single Home.tsx with all sections inline + hero sub-components (SpeechBubble, AnimatedCoffeeCup defined at top of file)

## Product

- **Hero**: Two-column (text left, animated coffee cup illustration right); CoffeeMugLetter SVG replaces the "J"; rotating speech bubble taglines; 4 CTA buttons (View Projects, Resume ↓, GitHub, LinkedIn)
- **Experience**: Accordion cards — FTB, USF, Cognizant, Samsung
- **Projects**: 3 project cards with AI-generated images
- **Skills**: Categorized (Backend, Cloud/Data, Databases/BI, AI Tools)
- **Education & Certs**: USF MSBA + Karunya BTech; AWS SAA + PL-300
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
