# Homepage next-phase candidate

## Scope and state

- Base: `origin/main` at `c90f175096ab7053b8d2e7119ca2aaee85bb2407`.
- Branch: `feat/home-next-phase-20260920` in an isolated worktree.
- Owner-approved design: `docs/superpowers/specs/2026-09-20-home-next-phase-design.md`.
- Implementation plan: `docs/superpowers/plans/2026-09-20-home-next-phase.md`.
- MERGED: no.
- DEPLOYED: no; staging and production remain prohibited without separate explicit approval.

## Mobile task access

| Viewport | Baseline task heading top | Baseline first task top | Baseline first value-proof top | Candidate first task top | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| 360×800 | 1745px | 1829px | 1092px | 1176px | PASS; 653px earlier and before value proofs |
| 390×844 | 1641px | 1725px | 1012px | 1096px | PASS; 629px earlier and before value proofs |

## Search placeholder contrast

| Theme | Computed foreground | Opacity | Computed background | Rendered ratio | Result |
| --- | --- | ---: | --- | ---: | --- |
| Light baseline | `rgb(90, 101, 119)` | 0.48 | `rgb(255, 255, 255)` | 2.06:1 | RED; scoped correction required |
| Dark baseline | `rgb(123, 138, 166)` | 0.42 | `rgb(17, 26, 46)` | 1.92:1 | RED; scoped correction required |
| Light candidate | `rgb(71, 85, 105)` | 1 | `rgb(255, 255, 255)` | 7.58:1 | PASS |
| Dark candidate | `rgb(154, 166, 189)` | 1 | `rgb(17, 26, 46)` | 7.07:1 | PASS |

Visual evidence: `reports/next-phase/screenshots/` contains 360×800 and 390×844 full-page light/dark captures plus a 360×800 DPR2 equivalent-zoom capture. Keyboard order from the last hero action reaches the first task link; all six task links are at least 44px high and no approved viewport overflows horizontally.

## Consent/install matrix

NOT_RUN. Required states: unknown, accepted, rejected, install-dismissed, `appinstalled`, storage failure and listener cleanup.

## GSC/GEO

BLOCKED pending an authorized complete current/prior 28-day Performance export and Page indexing reasons. Raw exports and private queries will not be committed.

## Verification log

| Command or scenario | Result | Evidence |
| --- | --- | --- |
| Design docs links and licensing | PASS | commits `31bc296a` and `3b4b70ac` |
| Playwright Windows server config contract | PASS | `tests/unit/playwright-config.test.ts`; environment moved to `webServer.env` |
| Mobile order RED | EXPECTED_FAIL | 360: first task 1829px vs value proof 1092px; 390: 1725px vs 1012px |
| Placeholder contrast baseline | EXPECTED_FAIL | Light 2.06:1; dark 1.92:1; both below 4.5:1 |
| Mobile/contrast GREEN | PASS | 3/3 focused tests; task offsets reduced, light 7.58:1, dark 7.07:1, keyboard/touch/DPR2 checks pass |
| Existing homepage E2E | PASS | 7/7 with one worker; an earlier two-worker dev run had 2 hydration-race navigation failures before passing in isolation |
| TypeScript | PASS | `pnpm typecheck` |
| Application gates | NOT_RUN | — |
