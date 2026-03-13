# portfolio — hopejet Public Portfolio

> Part of the [hopejet multi-repo ecosystem](../CLAUDE.md). Read that file for the full picture.

## Purpose

Public-facing portfolio containing polished experiments and revenue-generating projects. This repo is **PUBLIC** on GitHub — never commit secrets, internal API references, or private infrastructure details.

## Tech Stack

- TypeScript + Next.js (per app under `apps/`)
- pnpm workspaces + Turborepo
- Deployed to Vercel
- Shared configs: `@hopejet/config` | Shared utilities: `@hopejet/utils` | Shared UI: `@hopejet/ui`

## Development Commands

```bash
pnpm install         # Install all workspace dependencies
pnpm dev             # Start all apps (Turborepo parallel dev)
pnpm build           # Build all apps
pnpm lint            # Lint all apps
turbo run typecheck  # Type-check all apps
```

## Slash Commands

- `/new-project NAME` — Scaffold a new app under `apps/project-NAME/` with Next.js starter
- `/lighthouse APP` — Run Lighthouse audit and report performance/accessibility scores
- `/deploy APP` — Pre-flight checks (lint, typecheck, build, security scan) and Vercel deploy
- `/pr-review PR-NUMBER` — Full security + quality review of a PR before merging to main

## Security Policy (PUBLIC REPO)

**Before every merge to `main`:**
1. Run `/pr-review` — security scan is NOT optional
2. Confirm no secrets, internal URLs, or private data in the diff
3. Never force-push to `main`
4. Branch protection should be enabled on `main`

## App Structure

```
apps/
├── landing/         # Main portfolio site
└── project-*/       # Individual projects (one app per project)

packages/
└── ui/              # Portfolio-specific public UI components
```

## Adding a New Project

Use `/new-project` or:
1. Create `apps/project-NAME/` (Next.js app structure)
2. Connect to Vercel (set root directory to `apps/project-NAME`)
3. Set env vars in Vercel dashboard
4. Run `/lighthouse` after first production deploy

## Migration Status

This repo was cloned from `hopejet/portfolio` and is being incrementally migrated to the target monorepo structure. See the root CLAUDE.md for the full migration strategy.
