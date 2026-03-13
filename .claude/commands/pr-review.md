Review a pull request in the portfolio repo before merging to main.

## Steps

1. Ask for the PR number or URL. Fetch details with:
   ```bash
   gh pr view PR-NUMBER --json title,body,files,additions,deletions,author
   gh pr diff PR-NUMBER
   ```

2. Review the diff for:

   ### Security (REQUIRED — this is a public repo)
   - [ ] No hardcoded API keys, tokens, or secrets
   - [ ] No internal domain or infrastructure references
   - [ ] No private endpoints, credentials, or personal data
   - [ ] No `console.log` statements leaking sensitive values

   ### Code quality
   - [ ] TypeScript types are explicit — no untyped `any` escape hatches
   - [ ] Imports use `@hopejet/utils` and `@hopejet/config` rather than copy-pasted code
   - [ ] No new standalone ESLint/tsconfig/Prettier configs — must extend `@hopejet/config`

   ### Performance
   - [ ] No large assets committed directly (images > 500KB, fonts, videos)
   - [ ] New images use `next/image` for optimization
   - [ ] No blocking synchronous operations in React render paths

   ### Accessibility
   - [ ] Interactive elements have accessible labels
   - [ ] Color contrast meets WCAG AA
   - [ ] New pages have a `<title>` and `<meta description>`

3. Run checks locally on the PR branch:
   ```bash
   gh pr checkout PR-NUMBER
   pnpm lint
   turbo run typecheck
   pnpm build
   ```

4. Summarize findings as:
   - **APPROVE**: All checks pass, no concerns
   - **APPROVE WITH COMMENTS**: Minor issues, non-blocking
   - **REQUEST CHANGES**: Blocking issues found (list them)

5. Post review to GitHub:
   ```bash
   gh pr review PR-NUMBER --approve   # or --request-changes -b "COMMENT"
   ```
