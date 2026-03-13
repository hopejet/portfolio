Run Lighthouse audits on one or all portfolio apps and report the results.

## Steps

1. Ask: Which app to audit? (e.g., `landing`, `project-color-palette-tool`, or `all`)

2. For each app to audit, determine the URL:
   - Local: `http://localhost:PORT` (check package.json for the port)
   - Production: read from Vercel project settings or ask me

3. Run Lighthouse via the CLI:
   ```bash
   npx lighthouse URL \
     --output=json \
     --output-path=./lighthouse-APPNAME-$(date +%Y%m%d).json \
     --chrome-flags="--headless" \
     --only-categories=performance,accessibility,best-practices,seo
   ```

4. Parse the JSON output and present a summary table:

   | Category | Score | Target |
   |---|---|---|
   | Performance | XX | ≥ 90 |
   | Accessibility | XX | 100 |
   | Best Practices | XX | ≥ 95 |
   | SEO | XX | ≥ 90 |

5. For any category below target, list the top 3 failing audits with descriptions and suggested fixes.

6. Save the summary as `lighthouse-reports/APPNAME-YYYYMMDD.md` for tracking over time.

7. If performance is below 70, flag it as a blocker before the next deploy.

## Notes

- Run on production URLs before merging significant UI changes
- Lighthouse scores vary — run 3 times and average for stable readings
- Test mobile with `--emulated-form-factor=mobile` (scores will be lower than desktop)
