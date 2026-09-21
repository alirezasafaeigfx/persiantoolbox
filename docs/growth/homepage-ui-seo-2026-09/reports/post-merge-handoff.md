# Phase 11.5 final deployment review

## Current snapshot

- Reviewed production SHA: `7c9559c569e618f187e3a222d6c6ee1cfdef530b`.
- Deployment run: [35562641880](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35562641880), successful.
- Coordination issue: [#47](https://github.com/alirezasafaeigfx/persiantoolbox/issues/47).
- Historical failed run: [35551767845](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35551767845).
- Historical candidate evidence remains in [`next-phase-candidate.md`](./next-phase-candidate.md); this file records the current snapshot and does not rewrite that history.

## Release authority

No explicit owner approval to perform a new merge, deploy, or rollback was found in the available conversation. The current user instruction expressly prohibits those actions. Issue #47 owner updates dated 2026-09-20 and 2026-09-21 record earlier merges/deploys and repeatedly state that new approval is required; they are historical evidence, not authorization for this review. No new release action was performed.

## UI and 200% zoom evidence

- The old test name `200% zoom` was inaccurate. `deviceScaleFactor: 2` is now named and reported as **DPR 2 density**, not browser zoom.
- The focused Playwright checks cover light and dark themes, search visibility, hero control visibility, all six task paths, keyboard order, 44px targets, control bounds, and horizontal overflow at mobile DPR 2.
- Actual browser zoom at 200%: **NOT_RUN**. Playwright's supported API here does not set browser UI zoom; CDP page scale and device scale are different measurements. Manual Chromium/Firefox verification is required and must capture the tested SHA, theme, viewport, keyboard path, clipping/overlap result, and screenshot. No PASS is claimed for actual browser zoom.

## Timeout investigation

The raw `production-post-deploy-35551767845.md` artifact shows:

| URL | Attempts | Result |
| --- | ---: | --- |
| `/` | 2 | `This operation was aborted` on www and apex candidates |
| `/tools` | 2 | `This operation was aborted` on www and apex candidates |
| `/loan` | 2 | `This operation was aborted` on www and apex candidates |
| `/salary` | 2 | `This operation was aborted` on www and apex candidates |
| `/date-tools` | 2 | `This operation was aborted` on www and apex candidates |
| `/offline` | 2 | `This operation was aborted` on www and apex candidates |
| `/admin/site-settings` | 2 | `This operation was aborted` on www and apex candidates |

`/api/health` and `/api/ready` returned 200; database read/write and backup checks passed. The report also recorded all four security-header checks aborted. This proves requests exceeded the report's 5-second request deadline and the strict job failed closed. It does **not** prove that cold start was the sole cause. The issue update calls cold-start SSR the cause based on the captured report, but no application/server timing trace is present in the artifact; the causal explanation remains **UNPROVEN / follow-up review**.

Run 35562641880 used the same strict report with `--timeout-ms=30000`; all smoke URLs and headers returned 200, the report passed, and rollback was skipped. The timeout increase is a verification-window change, not a site-speed improvement. Strict non-zero failure handling and the rollback step remain in [`deploy-production.yml`](../../../../.github/workflows/deploy-production.yml), and the workflow still uploads the report.

## Status separation

| Area | Status | Evidence |
| --- | --- | --- |
| UI implementation | PASS for merged SHA | candidate report and focused E2E |
| Automated tests | PASS on deployment SHA CI | run 35562641880 deploy-gate and prior PR checks |
| Merge | Historical PR #50 already merged; no new merge | Issue #47 owner update |
| Deployment | PASS for historical run 35562641880; no new deploy | workflow and report artifact |
| GSC/GEO | **BLOCKED** | no authorized current/previous complete 28-day export or read-only credential |
| Actual browser zoom 200% | **NOT_RUN** | automation limitation documented above |

## GSC input required

To unblock GSC/GEO, provide an authorized read-only export or access for property, complete latest 28 days and preceding 28 days, search type and filters, pages, queries, country/device dimensions, and Page indexing report/reasons. Keep raw exports, private queries, keys, and tokens outside the public repository.
