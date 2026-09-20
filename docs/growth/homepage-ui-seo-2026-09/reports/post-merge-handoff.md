# Post-merge handoff — PT-HANDOFF-01

Observed 2026-09-20 UTC. This report supersedes pre-merge next-action instructions in candidate.md.

## Release state

- Owner visually accepted phase one and authorized its merge; PR #43 and replacement PR #45 are merged. PR #44 was superseded after the documentation squash merge removed its base branch.
- Verified main: `c90f175096ab7053b8d2e7119ca2aaee85bb2407`. This is not a production SHA claim.
- No staging or production deployment is authorized. Finish agreed work and obtain explicit owner release approval. New PRs also need owner merge approval.
- PR #46 inherited the pre-squash implementation ancestry: its three-dot diff repeated 45 files. The clean replacement starts at current main and transfers only the new handoff delta from `9ac18637` plus these documentation corrections.
- Original user checkout and its uncommitted application changes remain untouched.

## Verified push CI on main

- [ci-core: success](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35538167547)
- [Lighthouse: success](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35538167546)
- [deploy-gate: success](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35538167553)
- [CodeQL: success](https://github.com/alirezasafaeigfx/persiantoolbox/actions/runs/35538167560)
- A successful deploy-gate is not deployment evidence. Production was not inspected or changed during this task.

## Next-phase plan — proposed, not implemented

| Work                        | Acceptance evidence                                                                                                                                                                                                                                                                                                                                                | Status                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Mobile tool access          | Measure distance from page top to first task card at 360/390px; reduce it without smaller body text, hidden essential content or broken keyboard/DOM order. Keep search and primary action easy to reach; compare screenshots, mobile E2E and 200% zoom.                                                                                                           | OPEN                                       |
| Search placeholder contrast | Record computed foreground/background and measured contrast in light/dark themes; target at least 4.5:1 for normal text. Change scoped colors only where needed; preserve accessible input label and focus.                                                                                                                                                        | OPEN                                       |
| Consent/install overlap     | Before implementation, record owner approval of the specific behavior: defer install UI while consent is unknown, preserve the deferred install event, delay and dismissal, and allow both accepted and rejected consent to resolve the gate. Verify unknown/accepted/rejected/dismissed and appinstalled cleanup.                                                 | DECISION PENDING; PT-04 diagnosis complete |
| GSC and GEO                 | Obtain authorized Performance exports for the latest complete 28 days and preceding 28 days, with dates, property, search type and filters; include pages, queries, country/device and Page indexing reasons. Keep raw exports and private queries outside the public repository. Produce source-backed priorities; do not claim ranking growth or invent metrics. | BLOCKED on private data                    |

## Coordination

ChatGPT can direct local execution through Remote Desktop Commander during active turns. Codex CLI remains the application implementer; evidence is exchanged in [issue #47](https://github.com/alirezasafaeigfx/persiantoolbox/issues/47). There is no continuous background monitoring. The first direct CLI attempt stopped at a service WebSocket 404 before implementation; it was terminated, and ChatGPT completed this documentation-only task directly.
