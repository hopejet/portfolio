Scaffold a new project in the portfolio monorepo under apps/.

## Steps

1. Ask: What is the project name (kebab-case, e.g., `color-palette-tool`)? Is it a Next.js app or something else?

2. Create `apps/project-NAME/` with:

   **`package.json`**:
   ```json
   {
     "name": "project-NAME",
     "version": "0.1.0",
     "private": true,
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "eslint src",
       "typecheck": "tsc --noEmit"
     },
     "dependencies": {
       "@hopejet/ui": "^0.1.0",
       "@hopejet/utils": "^0.1.0",
       "next": "^14.0.0",
       "react": "^18.0.0",
       "react-dom": "^18.0.0"
     },
     "devDependencies": {
       "@hopejet/config": "^0.1.0",
       "@types/react": "^18.0.0",
       "@types/react-dom": "^18.0.0",
       "typescript": "^5.4.0"
     }
   }
   ```

   **`tsconfig.json`**:
   ```json
   {
     "extends": "@hopejet/config/tsconfig/nextjs",
     "include": ["src", "next-env.d.ts"],
     "exclude": ["node_modules"]
   }
   ```

   **`next.config.ts`** with basic config:
   ```typescript
   import type { NextConfig } from "next";
   const config: NextConfig = {};
   export default config;
   ```

   **`src/app/layout.tsx`** — root layout with title set to the project name.

   **`src/app/page.tsx`** — starter page with project title and brief description.

3. Add the new app to Turborepo pipeline in `turbo.json` if it exists.

4. Security reminder: before adding any new page or API route, verify it contains no:
   - Internal API URLs or credentials
   - References to private infrastructure
   - Hardcoded personal data

5. Run `pnpm build --filter project-NAME` to verify the app builds successfully.

6. Print next steps:
   - [ ] Add the app to Vercel (import from GitHub, set root directory to `apps/project-NAME`)
   - [ ] Set any required env vars in Vercel dashboard
   - [ ] Run `/lighthouse` after first deploy to establish baseline scores
