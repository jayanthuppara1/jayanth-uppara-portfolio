# Jayanth Uppara Portfolio

Interactive personal portfolio website presenting Jayanth Uppara as a Product Engineer / Full-Stack Software Engineer.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port 21113, root path `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, path `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4 + framer-motion
- API: Express 5 (not used by portfolio — standalone static frontend)
- No database needed for portfolio

## Where things live

- `artifacts/portfolio/src/pages/Home.tsx` — entire portfolio UI (all 7 sections)
- `artifacts/portfolio/src/index.css` — theme source of truth: CSS `@theme inline` block defines all semantic tokens (--background, --primary, etc.) AND coffee palette tokens (--color-coffee-latte, --color-coffee-bronze, etc.) usable as Tailwind utilities (text-coffee-latte, bg-coffee-bronze, etc.). No tailwind.config.ts needed — Tailwind v4 reads @theme from CSS.
- `artifacts/portfolio/src/assets/` — AI-generated project card images
- `artifacts/portfolio/vite.config.ts` — Vite config with `@assets` alias and framer-motion dedupe
- `artifacts/api-server/src/` — Express API server (health endpoint only)

## Architecture decisions

- Portfolio is a pure frontend SPA — no backend, no API calls, all content is hardcoded in Home.tsx
- Dark mode as default (no toggle); dark navy background with cyan `hsl(189 94% 43%)` accent
- framer-motion added to Vite `dedupe` list to prevent duplicate React instance errors
- Single Home.tsx component with all sections inline (no page routing needed for a portfolio)
- Project images generated via AI and stored in `src/assets/`

## Product

- Hero section with animated cycling job titles (framer-motion AnimatePresence)
- Interactive Experience section — accordion cards for 4 employers (FTB, USF, Cognizant, Samsung)
- Projects section with 3 project cards and AI-generated images
- Skills section organized by category (Backend, Cloud/Data, Databases/BI, AI Tools)
- Education and Certifications sections
- Contact section with mailto, LinkedIn, GitHub, resume download

## User preferences

- Name: Jayanth Uppara | Tampa, FL | jayanthuppara999@gmail.com | 656-203-4661
- LinkedIn: linkedin.com/in/jayanthu
- No emojis anywhere in the UI

## Gotchas

- framer-motion must stay in `resolve.dedupe` in vite.config.ts — removing it causes "Cannot read properties of null (reading 'useRef')" at runtime
- Resume PDF download and GitHub links are currently `#` placeholders — update when real files are available

## Pointers

- See the `react-vite` skill for frontend conventions
- See the `design` skill for delegating UI work to DESIGN subagent
