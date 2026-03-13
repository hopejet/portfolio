Deploy a portfolio app to Vercel.

## Pre-deploy checklist

1. Ask which app to deploy (e.g., `landing`, `project-color-palette-tool`).

2. Run pre-deploy checks:
   ```bash
   pnpm lint --filter APP-NAME
   turbo run typecheck --filter APP-NAME
   pnpm build --filter APP-NAME
   ```
   Abort and report errors if any step fails.

3. **Security scan** (REQUIRED for public repo — never skip):
   - Search for hardcoded API keys or tokens: `grep -r "sk-\|Bearer \|api_key\|apiKey" apps/APP-NAME/src`
   - Check for internal domain references: `grep -r "\.internal\|\.local" apps/APP-NAME/src`
   - Confirm no `.env` files are tracked: `git status | grep .env`
   If any issues are found, STOP and report them before proceeding.

4. Check that required Vercel env vars are set for the app (list from `.env.example` if it exists).

## Deploy commands

```bash
# If Vercel CLI is installed:
vercel --cwd apps/APP-NAME --prod

# Or trigger via GitHub push to main (if Vercel is connected to the repo):
git push origin main
```

## Post-deploy verification

1. Visit the production URL and verify the app loads correctly.
2. Run `/lighthouse APP-NAME` to check performance hasn't regressed.
3. Check Vercel deployment logs for any runtime errors.

## Rollback

In Vercel dashboard: Deployments → find the previous successful deploy → "Promote to Production".
Or via CLI: `vercel rollback --scope YOUR-SCOPE`
