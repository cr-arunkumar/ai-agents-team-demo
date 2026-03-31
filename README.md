# StandupAI

AI-powered standup summarizer. Paste your team's daily standup and get instant mood analysis, a streaming sprint summary, and risk detection.

## Setup

1. `cp .env.example .env.local`
2. Add your `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com)
3. `npm install`
4. `npm run dev`

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run tests once |
| `npm run test:coverage` | Tests + coverage report |
| `npm run test:ui` | Vitest UI |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |
| `npm run format` | Prettier format |

## Deploy

Push to `main` → GitHub Actions runs lint + test + build → auto-deploys to Vercel.

Pull requests get a Vercel preview URL posted as a comment.

## Stack

- Next.js 16 App Router
- Vercel AI SDK + Google Gemini 2.0 Flash
- TanStack Query v5
- Tailwind CSS v4 + shadcn/ui
- Vitest + MSW + Testing Library
