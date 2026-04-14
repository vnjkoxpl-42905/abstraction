# Abstraction — LSAT Role Questions Bootcamp

A premium, interactive LSAT bootcamp app for Aspiring Attorneys, focused on mastering Role Questions — the most structurally demanding question type on the LSAT.

## Overview

**Abstraction** is a guided, linear bootcamp experience that teaches LSAT Role Questions through five progressive modules:

1. **Foundations: The Keyword List** — Seven LSAT terms that change meaning on the test
2. **Reading Answer Choices: Six Suspicious Types** — Word-for-word parsing patterns
3. **Decoding Question Stems** — Translating abstract stems into plain English
4. **Role Questions: Theory** — The three-step method, concession vs. opposing viewpoint, 15-pattern taxonomy
5. **Role Questions: Difficult Traits** — Three structural traps that separate 165+ scorers

## Key Features

- **Commit Before Coaching**: Students always answer first; coaching is revealed only after commitment
- **Guided Sections**: Each module contains structured lessons with checkpoints and applications
- **LSAT Practice**: End-of-module question sets with multi-stage coaching
- **Progress Persistence**: All progress saved to localStorage — resume mid-section anytime
- **Module Gating**: Modules unlock sequentially; complete one to unlock the next

## Tech Stack

- **React 18** + TypeScript
- **Vite** (build tool & dev server)
- **Tailwind CSS** (styling)
- **React Router** (navigation)
- **localStorage** (client-side persistence)

## Quick Start

```bash
cd abstraction
npm install
npm run dev
```

Then visit http://localhost:5173

## Build

```bash
npm run build
```

Builds to `abstraction/dist/`.

## Project Structure

```
abstraction/
├── src/
│   ├── components/       # UI components (ModuleCard, Checkpoint, etc.)
│   ├── pages/           # Route pages (Dashboard, ModuleOrientation, etc.)
│   ├── content/
│   │   ├── roleQuestions/  # Curriculum content (m1–m5 modules)
│   │   └── types.ts        # Content type definitions
│   ├── lib/
│   │   ├── progress.ts     # Progress state & localStorage
│   │   ├── aiFeedback.ts   # AI feedback (stub for Lovable integration)
│   │   └── markdown.tsx    # Light markdown parser
│   ├── App.tsx          # Main router
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind imports
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Development Notes

- Content is authoring in `src/content/roleQuestions/*.ts`
- Module data follows the `Module` interface (see `src/content/types.ts`)
- Progress is keyed as `abstraction.v1` in localStorage
- AI feedback is stubbed in `src/lib/aiFeedback.ts` for integration with Lovable

## License

Educational material. All rights reserved.
