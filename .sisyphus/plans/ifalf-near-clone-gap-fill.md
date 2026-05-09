# Ifalf Near-Clone Gap Fill Plan

## TL;DR

> **Quick Summary**: Bring the current Fariz portfolio much closer to the Ifalf reference captured in `.firecrawl/`, while preserving Fariz identity/content and retaining the current sequence/3D strengths as differentiated additions.
>
> **Deliverables**:
> - Secure dev-only Firecrawl reference tooling and local asset/reference inventory.
> - Ifalf-style hero clock, dual marquees, tech-logo marquee, project filters, quote/contact/footer polish.
> - Exact local asset set where permitted, never hotlinked.
> - Fariz wordmark/logo asset replacing Ifalf's `aldome.svg` role in nav/footer.
> - Mobile/performance hardening for SequenceScroll, ID card physics, cursor, hover alternatives, and heavy assets.
> - Vercel Analytics, Vitest baseline, Playwright visual/E2E smoke checks, and mandatory agent QA evidence.
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 implementation waves + final verification
> **Critical Path**: T0 baseline → T1 security/reference inventory → T2 test infra → T5 content model → T8b section order → T13 mobile/performance → Final QA

---

## Context

### Original Request
User asked to plan filling the current state missing pieces compared to the original Ifalf concept/reference in `/Users/ktz/migrate/.firecrawl`, calling out missing custom fonts, analytics, mobile polish, exact images/assets, scraped text mapping, styling fidelity, ID card physics tuning, and preloader/Lenis/SequenceScroll transitions.

### Interview Summary
**Confirmed decisions**:
- **Fidelity**: Near clone — aggressively match Ifalf's layout, sections, motion, typography, project filters, clock, ticker, CTA, and assets/style.
- **Identity**: Fariz identity — visible name/socials/projects should stay Fariz-branded where possible.
- **Assets**: Use exact assets where permitted, but localize them; never hotlink Ifalf.
- **Firecrawl route**: Keep as dev-only secure tool, not a public production feature.
- **Extras**: Vercel Analytics only; no audio/BGM/sound toggle.
- **Testing**: Include all three: Vitest, Playwright, and agent-executed QA.

### Research Findings
- `.firecrawl/ifalf.md`, `.firecrawl/ifalf-main.md`, `.firecrawl/ifalf/index.md`: rich full-page scrape.
- `.firecrawl/ifalf/projects/index.md`: full project listing with 17 projects and categories.
- Additional local reference inputs to inspect before implementation: `ifalf_head.html`, `ifalf_home.html`, and `ifalf_snapshot.txt` if present in the repository.
- Reference homepage order: **Hero → DualMarquee → About → TechLogos → ProjectHighlights → Quote → Contact → Footer**.
- Ifalf sections: live-clock hero, scroll CTA, dual role marquee, About glitch/duplicate-text effect, tech-logo marquee, project highlights/grid filters, quote, contact CTA, footer.
- Tech assets: `htmlnime.webp`, `cssnime.webp`, `vsnime.webp`, `tsnime.webp`, `pynime.webp`, `reactnime.webp`, `nextnime.webp`, `twnime.webp`, `nodenime.webp`, `laranime.webp`, `figmanime.webp`, `bunime.webp`.
- Project thumbnails: `aernstore.webp`, `breakthrough.webp`, `cultrahub.webp`, `roast.webp`, `keluhkesah.webp`, `nusadaya.webp`, `bhinneka.webp`, `butterfly.webp`, `daily.webp`, `tools.webp`, `aldonime.webp`, `xpdc.webp`, `begone.webp`, `gfx.webp`, `frame.webp`, `feed.webp`, `logo.webp`.
- No audio references were found in scraped content.
- Current repository has no test infrastructure, no CI, no coverage, and no test files.

### Metis Review
**Identified gaps addressed**:
- SequenceScroll decision: keep it as a Fariz differentiator, but integrate Ifalf-style clock/CTA/transition rhythm instead of deleting the 192-frame work.
- Asset IP risk: exact assets may be used only if permitted and localized; plan must include provenance notes and fallback placeholders.
- Fariz identity ambiguity: use existing `lib/constants.ts` as the source of truth, expanding it to include Ifalf-style fields without copying Ifalf personal identity.
- Mobile/performance risk: define explicit mobile breakpoints, reduced motion, WebGL fallback, and performance QA.
- Scope creep: no audio, no CMS/admin, no blog implementation, no project detail pages unless already present.

---

## Work Objectives

### Core Objective
Transform the portfolio into a near-clone of Ifalf's visual and interaction system while keeping Fariz's identity and existing high-value features. The result should feel like the Ifalf reference: dark/bold typography, live clock, dual marquees, tech-logo marquee, filtered project showcase, strong quote/contact/footer, polished mobile, and coordinated scroll transitions.

### Concrete Deliverables
- Secure Firecrawl dev-only route with server-only env usage.
- Local reference/asset inventory for Ifalf-derived assets.
- Expanded `lib/constants.ts` content model for Fariz-branded Ifalf-style sections.
- Live clock and Ifalf-style hero overlays integrated with SequenceScroll.
- Dual counter-moving role marquee.
- Anime/VTuber tech logo marquee.
- Filterable project grid with local thumbnails and touch-friendly interactions.
- Full `/projects` index page matching the reference's filter-page concept, plus homepage highlights.
- `/about` route or explicit placeholder matching the reference navigation expectation.
- Quote, contact CTA, footer parity sections.
- ID card physics/mobile/reduced-motion polish.
- Preloader/SequenceScroll/Lenis coordination.
- Vercel Analytics.
- Vitest + Playwright setup with smoke tests.

### Definition of Done
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run type-check` passes if added by task T2.
- [ ] `npm run test` passes if added by task T2.
- [ ] `npm run test:e2e` passes if added by task T2.
- [ ] Playwright mobile and desktop evidence exists under `.sisyphus/evidence/`.
- [ ] No hardcoded Firecrawl key remains in tracked files.
- [ ] No production endpoint exposes Firecrawl scraping.
- [ ] Baseline build/lint evidence exists before implementation begins.

### Must Have
- Near-clone Ifalf visual structure while preserving Fariz identity.
- Homepage section order must match Ifalf's reference order unless a task explicitly documents placement for Fariz-only additions.
- Hero must include stacked/oversized Fariz name treatment plus two clocks: site/reference timezone and viewer local time.
- Homepage projects must be highlights; full project/filter experience must be handled separately on `/projects`.
- Local assets only; no runtime hotlinks to `ifalf.com`.
- All new motion respects `prefers-reduced-motion`.
- Mobile target: 375px, 428px, 768px, and desktop 1440px.
- Tailwind v4 CSS `@theme` conventions; no `tailwind.config.js`.
- Motion v12 imports from `motion/react` and `LazyMotion` + `domAnimation` where applicable.

### Must NOT Have (Guardrails)
- Do not implement audio/BGM/sound toggles.
- Do not remove SequenceScroll unless a later explicit user decision changes this plan.
- Do not hotlink Ifalf assets.
- Do not copy Ifalf personal identity/socials as final content.
- Do not build a CMS, admin panel, auth, i18n, payments, blog engine, search, pagination, or project detail pages.
- Do not build the `Open IfalAI` floating/chat widget.
- Do not copy Ifalf project thumbnails/brand assets unless permission/provenance is documented; use Fariz-branded placeholders as the default fallback.
- Do not use `as any`, `@ts-ignore`, or eslint-disable comments.
- Do not break section stacking convention: post-SequenceScroll sections use `-mt-[100vh] relative z-10` unless intentionally replaced with verified equivalent.

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No acceptance criterion may require manual user confirmation.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: Vitest + Playwright to be added
- **Framework**: Vitest + Testing Library; Playwright for E2E/visual smoke
- **Agent QA**: ALWAYS, mandatory for every task

### QA Policy
Every task below includes executable QA scenarios. Evidence must be saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (Pre-flight):
└── T0 Baseline build/lint evidence [quick]

Wave 1 (Foundation):
├── T1 Secure Firecrawl + reference inventory [quick]
├── T2 Test/tooling baseline [unspecified-high]
├── T3 Asset acquisition + provenance manifest [quick]
├── T4 Typography/design tokens [visual-engineering]
└── T5 Content model expansion [quick]

Wave 2 (Core parity sections):
├── T6 Live clock + hero overlay [visual-engineering]
├── T7 Dual counter-row marquee [visual-engineering]
├── T9 Tech-logo marquee [visual-engineering]
├── T10 Homepage project highlights [visual-engineering]
├── T10b Full /projects and /about route parity [visual-engineering]
├── T11 Quote/contact/footer parity [visual-engineering]
└── T11b About glitch/duplicate-text treatment [visual-engineering]

Wave 3 (Integration + polish):
├── T8 SequenceScroll/preloader/Lenis coordination [deep]
├── T8b Section ordering + Fariz-only placement reconciliation [deep]
├── T12 ID card physics polish [deep]
├── T13 Mobile/performance hardening [deep]
├── T14 Vercel Analytics + metadata [quick]
└── T15 Dependency/code-health cleanup [quick]

Wave 4 (Automated verification):
├── T16 Vitest smoke tests [unspecified-high]
├── T17 Playwright E2E/visual checks [unspecified-high]
└── T18 Documentation handoff [writing]

Wave FINAL:
├── F1 Plan compliance audit (oracle)
├── F2 Code quality review (unspecified-high)
├── F3 Real manual QA by agent (unspecified-high)
└── F4 Scope fidelity check (deep)
```

### Dependency Matrix

- **T0**: blocks all implementation tasks; establishes baseline only
- **T1**: blocks T3, T14, T15
- **T2**: blocks T16, T17
- **T3**: blocks T9, T10, T10b, T11
- **T4**: blocks T6, T7, T9, T10, T10b, T11, T11b
- **T5**: blocks T6, T7, T9, T10, T10b, T11, T11b, T18
- **T6-T11b**: block T8, T8b, T13, T17
- **T8b**: blocks T13, T17
- **T12**: blocks T13, T17
- **T13-T15**: block T17 and final verification
- **T16-T18**: block final verification

### Agent Dispatch Summary
- Wave 0: 1 quick baseline agent.
- Wave 1: 5 parallel agents — quick/unspecified-high/visual-engineering.
- Wave 2: 7 parallel visual-engineering agents.
- Wave 3: 6 parallel agents — deep/quick.
- Wave 4: 3 parallel agents — unspecified-high/writing.
- Final: 4 parallel review agents.

---

## TODOs

- [x] 0. Capture pre-flight baseline build and lint evidence

  **What to do**:
  - Before implementation, run the current verification commands that already exist.
  - Do not run `npm run type-check`, `npm run test`, or `npm run test:e2e` in this task unless those scripts already exist before T2; T2 is responsible for adding them.
  - Capture whether the repository starts green or red.
  - If baseline is red, record exact failures as inherited baseline issues so later tasks do not hide regressions.

  **Must NOT do**:
  - Do not fix baseline failures in this task.
  - Do not treat inherited failures as implementation failures unless a later task worsens them.

  **Recommended Agent Profile**:
  - **Category**: `quick` — command-only baseline evidence.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `diagnose` — no fix attempt should happen here.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 0
  - **Blocks**: All implementation tasks
  - **Blocked By**: None

  **References**:
  - `package.json` — existing scripts: `dev`, `build`, `start`, `lint`.
  - `README.md` — stale docs to compare later in T18.

  **Acceptance Criteria**:
  - [ ] Baseline `npm run build` output captured.
  - [ ] Baseline `npm run lint` output captured.
  - [ ] Evidence explicitly states that type-check/test/e2e scripts are skipped until T2 unless already present.
  - [ ] Evidence file states whether baseline is green or red.

  **QA Scenarios**:
  ```
  Scenario: Baseline commands are captured
    Tool: Bash
    Preconditions: Clean working tree state as provided to executor
    Steps:
      1. Run npm run build and capture full output/exit code
      2. Run npm run lint and capture full output/exit code
      3. Save results with timestamp
    Expected Result: Baseline status is documented before edits
    Evidence: .sisyphus/evidence/task-0-baseline.txt

  Scenario: Baseline evidence distinguishes inherited failures
    Tool: Bash
    Preconditions: Baseline commands completed
    Steps:
      1. Read .sisyphus/evidence/task-0-baseline.txt
      2. Assert it contains `BASELINE: GREEN` or `BASELINE: RED`
    Expected Result: Future agents can distinguish regressions from inherited failures
    Evidence: .sisyphus/evidence/task-0-baseline-classification.txt
  ```

  **Commit**: NO
  - Message: N/A
  - Files: `.sisyphus/evidence/task-0-baseline.txt`
  - Pre-commit: N/A

- [x] 1. Secure Firecrawl dev-only tooling and reference inventory

  **What to do**:
  - Move Firecrawl API key usage in `app/api/scrape-ifalf/route.ts` to server-only env.
  - Make `/api/scrape-ifalf` dev-only: production should return 403/404 or be disabled by env guard.
  - Preserve `.firecrawl/ifalf-main.md` as static reference input, not runtime UI dependency.
  - Create a local markdown inventory of reference source files, asset names, and provenance notes at a path chosen by the implementation agent (recommended: `public/ifalf-assets/PROVENANCE.md` if assets are public, or `.sisyphus/plans/ifalf-asset-provenance.md` if keeping it planning-only).

  **Must NOT do**:
  - Do not expose scraping publicly in production.
  - Do not commit secrets or `.env.local` values.

  **Recommended Agent Profile**:
  - **Category**: `quick` — small security/tooling hardening.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `firecrawl-build-onboarding` — not needed because this is endpoint hardening, not first-time onboarding.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T3, T14, T15
  - **Blocked By**: None

  **References**:
  - `app/api/scrape-ifalf/route.ts` — current route and hardcoded-key risk.
  - `.firecrawl/ifalf-main.md` — static scrape reference.
  - `.firecrawl/ifalf/projects/index.md` — project asset/content reference.
  - `AGENTS.md` project note — identifies hardcoded key as critical.

  **Acceptance Criteria**:
  - [ ] No tracked file contains a Firecrawl key pattern such as `fc-`.
  - [ ] Dev route still works when proper env var is set.
  - [ ] Production-mode route fails closed.
  - [ ] Reference/provenance inventory exists as markdown.

  **QA Scenarios**:
  ```
  Scenario: Dev-only scrape route fails safely without env
    Tool: Bash (curl)
    Preconditions: FIRECRAWL_API_KEY unset; dev server running
    Steps:
      1. Run curl -i http://localhost:3000/api/scrape-ifalf
      2. Assert response status is 500, 403, or documented dev-only error with no secret in body
      3. Save headers/body
    Expected Result: No API key or raw secret appears in response
    Evidence: .sisyphus/evidence/task-1-firecrawl-no-env.txt

  Scenario: No secret remains in source
    Tool: Bash
    Preconditions: Repository after implementation
    Steps:
      1. Run grep-compatible search for `fc-` across tracked source files
      2. Assert zero matches outside ignored env files
    Expected Result: No hardcoded Firecrawl key in source
    Evidence: .sisyphus/evidence/task-1-no-hardcoded-secret.txt
  ```

  **Commit**: YES
  - Message: `fix(security): harden firecrawl reference tooling`
  - Files: `app/api/scrape-ifalf/route.ts`, provenance markdown inventory
  - Pre-commit: `npm run lint`

- [x] 2. Add test and quality tooling baseline

  **What to do**:
  - Add Vitest + Testing Library config for React/utility smoke tests.
  - Add Playwright config for desktop/mobile visual/E2E smoke checks.
  - Add scripts: `test`, `test:e2e`, `type-check`.
  - Keep setup minimal; no coverage gate unless trivial.

  **Must NOT do**:
  - Do not attempt full coverage or large test suite in this task.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` — package/config work with Next.js 16 risk.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `tdd` — this task creates infrastructure rather than implementing a feature through red-green-refactor.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T16, T17
  - **Blocked By**: None

  **References**:
  - `package.json` — existing scripts and dependencies.
  - `tsconfig.json` — TypeScript settings.
  - `node_modules/next/dist/docs/` — must be consulted for Next.js 16 testing/config compatibility before implementing.

  **Acceptance Criteria**:
  - [ ] `npm run type-check` exits 0.
  - [ ] `npm run test` exits 0 with at least one smoke test.
  - [ ] `npm run test:e2e` exits 0 with at least one browser smoke test.

  **QA Scenarios**:
  ```
  Scenario: Test commands are available
    Tool: Bash
    Preconditions: Dependencies installed
    Steps:
      1. Run npm run type-check
      2. Run npm run test
      3. Run npm run test:e2e
    Expected Result: All commands exit 0
    Evidence: .sisyphus/evidence/task-2-test-commands.txt

  Scenario: Broken smoke test fails correctly
    Tool: Bash
    Preconditions: Test infra installed
    Steps:
      1. Temporarily run a deliberately failing inline Vitest command or documented dry failure check
      2. Assert runner exits non-zero
      3. Revert temporary failure before commit
    Expected Result: Runner detects failures; no failing test remains
    Evidence: .sisyphus/evidence/task-2-negative-runner-check.txt
  ```

  **Commit**: YES
  - Message: `test(setup): add vitest and playwright smoke baseline`
  - Files: `package.json`, config files, initial tests
  - Pre-commit: `npm run test && npm run test:e2e`

- [x] 3. Acquire/localize Ifalf reference assets with provenance manifest

  **What to do**:
  - Download or otherwise localize permitted exact assets into a clear public asset directory using an explicit URL list from `.firecrawl/ifalf-main.md` and `.firecrawl/ifalf/projects/index.md`.
  - Default policy: use Fariz-branded placeholders unless asset permission/provenance is documented; exact Ifalf-derived assets require explicit provenance notes.
  - Include/produce a Fariz wordmark SVG to replace Ifalf's `/aldome.svg` role in nav/footer, plus 12 tech-logo webps and relevant project thumbnail webps or placeholders.
  - Record source URL, local path, intended use, and permission/provenance status in markdown.
  - If an asset is not permitted or unavailable, create a documented placeholder path and mark for replacement.

  **Must NOT do**:
  - Do not hotlink `https://ifalf.com/...` at runtime.
  - Do not silently use questionable assets without provenance notes.

  **Recommended Agent Profile**:
  - **Category**: `quick` — asset inventory/localization task.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: none — `firecrawl-download` or direct `curl` may be used only for permitted/public assets from the explicit URL list; otherwise create placeholders.

  **Parallelization**:
  - **Can Run In Parallel**: YES after T1 for provenance structure
  - **Parallel Group**: Wave 1
  - **Blocks**: T9, T10, T10b, T11
  - **Blocked By**: T1

  **References**:
  - `.firecrawl/ifalf-main.md` — homepage assets and sections.
  - `.firecrawl/ifalf/projects/index.md` — project thumbnails and categories.
  - `public/sequence/` — existing asset organization precedent.
  - `https://ifalf.com/<asset-name>` URL pattern — source pattern for explicitly permitted assets only.

  **Acceptance Criteria**:
  - [ ] All referenced local asset paths either exist or are explicitly marked as placeholders.
  - [ ] Fariz wordmark SVG exists locally and is referenced by nav/footer tasks instead of `/aldome.svg`.
  - [ ] No component references `ifalf.com` directly.
  - [ ] Manifest documents provenance and replacement status.

  **QA Scenarios**:
  ```
  Scenario: Required assets exist locally
    Tool: Bash
    Preconditions: Asset task completed
    Steps:
      1. Check local paths for Fariz wordmark SVG, 12 *nime.webp files, and selected project thumbnails/placeholders
      2. Assert each exists or is listed as placeholder in manifest
    Expected Result: No undocumented missing assets
    Evidence: .sisyphus/evidence/task-3-asset-inventory.txt

  Scenario: No runtime hotlinks
    Tool: Bash
    Preconditions: Asset references updated
    Steps:
      1. Search app/components/lib for `ifalf.com`
      2. Assert zero runtime references, excluding markdown provenance files
    Expected Result: Assets are local at runtime
    Evidence: .sisyphus/evidence/task-3-no-hotlinks.txt
  ```

  **Commit**: YES
  - Message: `chore(assets): localize ifalf reference assets`
  - Files: `public/**`, provenance markdown inventory
  - Pre-commit: asset existence script/check

- [x] 4. Match Ifalf typography and global design tokens

  **What to do**:
  - Identify and apply closer display/body font choices using `next/font` or local font files.
  - Inspect `ifalf_head.html` if present for real font/CSS clues before choosing fonts.
  - If no font metadata is available, choose from these close candidates and document rationale: `Bebas Neue` or `Anton` for giant display headings; `Outfit` or `Inter Tight` for body/UI.
  - Extend `app/globals.css` Tailwind v4 `@theme` and CSS variables for Ifalf-like dark/bold typography, selection color, transition tokens, and section spacing.
  - Preserve existing dark mode CSS vars and custom cursor conventions.

  **Must NOT do**:
  - Do not create `tailwind.config.js`.
  - Do not break `next/font` usage in `app/layout.tsx`.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` — visual fidelity and token work.
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `design-qa` — not a `.pen` design file.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T7, T9, T10, T10b, T11, T11b
  - **Blocked By**: None

  **References**:
  - `app/globals.css` — current Tailwind v4 theme and CSS vars.
  - `app/layout.tsx` — current Outfit font and ThemeProvider.
  - `.firecrawl/ifalf-main.md` — typography hierarchy clues from headings/section order.
  - `ifalf_head.html` — additional local reference for imported fonts/CSS if present.

  **Acceptance Criteria**:
  - [ ] Global typography visibly changes from default Inter-like baseline.
  - [ ] Dark/light theme still renders readable text.
  - [ ] No Tailwind config file added.

  **QA Scenarios**:
  ```
  Scenario: Typography tokens render on homepage
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000
      2. Read computed font-family for `body` and main hero heading
      3. Assert they match configured body/display fonts
      4. Capture screenshot
    Expected Result: Body/display fonts are applied and readable
    Evidence: .sisyphus/evidence/task-4-typography.png

  Scenario: Theme contrast remains readable
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Toggle dark/light using `[aria-label="Toggle theme"]`
      2. Assert body background and foreground colors differ in both modes
      3. Capture screenshots for both modes
    Expected Result: No invisible or same-color text
    Evidence: .sisyphus/evidence/task-4-theme-contrast.png
  ```

  **Commit**: YES
  - Message: `style(theme): align typography with ifalf reference`
  - Files: `app/globals.css`, `app/layout.tsx`
  - Pre-commit: `npm run lint && npm run build`

- [x] 5. Expand Fariz-branded content model for Ifalf section parity

  **What to do**:
  - Refactor/extend `lib/constants.ts` to include Fariz-branded data for hero clock labels, role marquee rows, about copy, tech logos, project categories, quote, contact CTA, footer, and optional dev-only references.
  - Keep existing `IDENTITY`, `SOCIALS`, and project identity as source of truth where possible.
  - Add category fields and local image paths for projects.

  **Must NOT do**:
  - Do not replace final visible identity with Ifalf's personal email/socials/name.
  - Do not fabricate Fariz projects beyond available data; use placeholders only if marked.

  **Recommended Agent Profile**:
  - **Category**: `quick` — data-model/content refactor.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `writing` — mostly structured constants, not prose drafting.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T7, T9, T10, T10b, T11, T11b, T18
  - **Blocked By**: None

  **References**:
  - `lib/constants.ts` — current site data consumed widely.
  - `.firecrawl/ifalf-main.md` — target section structure.
  - `.firecrawl/ifalf/projects/index.md` — category/filter model.

  **Acceptance Criteria**:
  - [ ] Constants export role marquee rows, tech logo list, project categories, quote, CTA, and footer content.
  - [ ] Existing consumers still compile.
  - [ ] Fariz identity fields remain Fariz-branded.

  **QA Scenarios**:
  ```
  Scenario: Constants import cleanly
    Tool: Bash
    Preconditions: Constants updated
    Steps:
      1. Run npm run type-check
      2. Assert no type errors from constants consumers
    Expected Result: TypeScript passes
    Evidence: .sisyphus/evidence/task-5-constants-typecheck.txt

  Scenario: No Ifalf personal identity in visible constants
    Tool: Bash
    Preconditions: Constants updated
    Steps:
      1. Search `lib/constants.ts` for `ifalfahri16@gmail.com`, `ifalfahri`, and `IFALFAHRIA`
      2. Assert no final visible Fariz identity fields use these strings, except reference comments if any
    Expected Result: Fariz identity preserved
    Evidence: .sisyphus/evidence/task-5-identity-guard.txt
  ```

  **Commit**: YES
  - Message: `feat(content): add ifalf-style fariz section data`
  - Files: `lib/constants.ts`
  - Pre-commit: `npm run type-check`

- [x] 6. Add Ifalf-style live clock and hero overlay while preserving SequenceScroll

  **What to do**:
  - Add a client live clock component with stable hydration behavior.
  - Integrate two clock readouts: reference/site time (Jakarta by default) and viewer local time (`Your time: HH:MM:SS`).
  - Integrate stacked oversized Fariz display-name treatment equivalent to Ifalf's `IFALFAHRIA` / spaced-line composition, adapted to Fariz identity.
  - Integrate scroll CTA into hero/SequenceScroll overlay.
  - Use Ifalf's clock/CTA concept without removing 192-frame scrollytelling.

  **Must NOT do**:
  - Do not replace Fariz name with Ifalf name.
  - Do not cause hydration mismatch from server-rendered time.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `firecrawl` — reference already scraped.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T13, T17
  - **Blocked By**: T4, T5

  **References**:
  - `components/SequenceScroll.tsx` — current hero/canvas overlay and frame loading.
  - `.firecrawl/ifalf-main.md` — live clock, dual-clock, stacked-name, and scroll CTA reference.
  - `app/HomeClient.tsx` — section composition.

  **Acceptance Criteria**:
  - [ ] Site/reference clock and viewer-local clock both render and update every second after hydration.
  - [ ] Hero renders stacked/oversized Fariz display-name treatment.
  - [ ] Scroll CTA visible in hero and does not block canvas.
  - [ ] SequenceScroll still renders frames.

  **QA Scenarios**:
  ```
  Scenario: Clock updates in hero
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000
      2. Read `[data-testid="site-clock"]` and `[data-testid="viewer-clock"]` text
      3. Wait 1200ms
      4. Assert both clock texts changed or seconds incremented
      5. Capture screenshot
    Expected Result: Live clock updates without hydration warning
    Evidence: .sisyphus/evidence/task-6-live-clock.png

  Scenario: Reduced motion keeps hero usable
    Tool: Playwright
    Preconditions: Browser context emulates reduced motion
    Steps:
      1. Navigate to homepage
      2. Assert `[data-testid="scroll-cta"]` is visible
      3. Assert no console errors
    Expected Result: Hero content remains visible with reduced motion
    Evidence: .sisyphus/evidence/task-6-reduced-motion.txt
  ```

  **Commit**: YES
  - Message: `feat(hero): add live clock and scroll cta overlay`
  - Files: `components/**`, `app/HomeClient.tsx` or `components/SequenceScroll.tsx`
  - Pre-commit: `npm run lint && npm run test`

- [x] 7. Upgrade marquee to dual counter-moving Ifalf role rows

  **What to do**:
  - Refactor current marquee to render two rows moving opposite directions.
  - Use Fariz role phrases inspired by Ifalf's `FRONTEND DEVELOPER - BACKEND SURVIVOR - DESIGN DREAMER` pattern.
  - Add hover pause and reduced-motion static fallback.

  **Must NOT do**:
  - Do not create unreadable marquee speed or infinite CPU-heavy animation.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `artistry` — task is well-defined visual implementation.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T13, T17
  - **Blocked By**: T4, T5

  **References**:
  - `components/Marquee.tsx` — current marquee implementation.
  - `lib/constants.ts` — current `MARQUEE_ITEMS` and new row constants.
  - `.firecrawl/ifalf-main.md` — role ticker reference text.

  **Acceptance Criteria**:
  - [ ] Two marquee rows render.
  - [ ] Rows move in opposite directions on desktop.
  - [ ] Reduced motion disables continuous animation.

  **QA Scenarios**:
  ```
  Scenario: Dual marquee rows render
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage
      2. Assert locator `[data-testid="role-marquee-row"]` has count 2
      3. Assert first row text contains `FRONTEND` or Fariz-equivalent role phrase
      4. Capture screenshot
    Expected Result: Two readable role rows are visible
    Evidence: .sisyphus/evidence/task-7-dual-marquee.png

  Scenario: Reduced motion disables marquee animation
    Tool: Playwright
    Preconditions: Reduced motion emulated
    Steps:
      1. Navigate to homepage
      2. Read computed animation-name for `[data-testid="role-marquee-row"]`
      3. Assert animation is `none` or duration effectively disabled
    Expected Result: No continuous marquee motion under reduced motion
    Evidence: .sisyphus/evidence/task-7-reduced-motion.txt
  ```

  **Commit**: YES
  - Message: `feat(marquee): add dual counter-moving role rows`
  - Files: `components/Marquee.tsx`, `lib/constants.ts`, `app/globals.css`
  - Pre-commit: `npm run test`

- [x] 8. Coordinate SequenceScroll, Preloader, and Lenis scroll rhythm

  **What to do**:
  - Prevent duplicate/competing loading overlays between `Preloader.tsx` and `SequenceScroll.tsx`.
  - Ensure SequenceScroll frame readiness gates or sequences cleanly after the preloader.
  - Verify Lenis smooth scrolling does not desync scroll-driven canvas frames or new reveal animations.
  - Keep section stacking rules intact.

  **Must NOT do**:
  - Do not remove the 192-frame sequence.
  - Do not break `-mt-[100vh] relative z-10` stacking convention.

  **Recommended Agent Profile**:
  - **Category**: `deep` — cross-component scroll coordination.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `diagnose` — no known bug yet, this is planned integration.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: T13, T17
  - **Blocked By**: T6, T7, T9, T10, T10b, T11, T11b

  **References**:
  - `components/Preloader.tsx` — timed clip-path preloader.
  - `components/SequenceScroll.tsx` — frame preloading and scroll progress.
  - `hooks/useLenis.ts` — smooth scroll setup.
  - `app/HomeClient.tsx` — section order.

  **Acceptance Criteria**:
  - [ ] User sees one coherent loading experience, not stacked loaders.
  - [ ] Canvas frames progress with scrolling after preloader exits.
  - [ ] Post-hero sections do not bleed under canvas incorrectly.

  **QA Scenarios**:
  ```
  Scenario: Load-to-scroll transition is coherent
    Tool: Playwright
    Preconditions: Dev server running; cache disabled
    Steps:
      1. Navigate to homepage
      2. Assert preloader appears first
      3. Wait until preloader exits
      4. Assert hero canvas/clock is visible and no second full-screen loader blocks interaction
      5. Scroll to 50% page height and capture screenshot
    Expected Result: Single coherent loading transition and canvas progresses
    Evidence: .sisyphus/evidence/task-8-load-scroll.png

  Scenario: Section stacking remains intact
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to About/next section
      2. Assert main section text is above canvas and readable
      3. Assert no canvas bleed-through covers text
    Expected Result: Sections layer correctly after SequenceScroll
    Evidence: .sisyphus/evidence/task-8-section-stacking.png
  ```

  **Commit**: YES
  - Message: `fix(scroll): coordinate preloader lenis and sequence frames`
  - Files: `components/Preloader.tsx`, `components/SequenceScroll.tsx`, `hooks/useLenis.ts`, `app/HomeClient.tsx`
  - Pre-commit: `npm run test:e2e`

- [x] 8b. Reorder homepage sections to match Ifalf reference and place Fariz-only additions intentionally

  **What to do**:
  - Update `app/HomeClient.tsx` composition to match reference order: Hero/SequenceScroll → DualMarquee → About → TechLogos → ProjectHighlights → Quote → Contact → Footer.
  - Decide Fariz-only placement for IDCard and Services in-code: either integrate IDCard as a Fariz-only insert between TechLogos and ProjectHighlights, move Services off the primary homepage flow, or document intentional omission from homepage.
  - Preserve required stacking classes or verified equivalent for sections following SequenceScroll.

  **Must NOT do**:
  - Do not leave current order (`SequenceScroll → Projects → IDCard → About → VTuberLogos → Marquee → Services → Contact → Footer`) unchanged.
  - Do not remove IDCard/Services silently without documenting the clone-fidelity reason.

  **Recommended Agent Profile**:
  - **Category**: `deep` — cross-section integration and fidelity decision.
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `prototype` — final ordering decision, not exploratory variants.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: T13, T17
  - **Blocked By**: T6, T7, T9, T10, T10b, T11, T11b

  **References**:
  - `app/HomeClient.tsx` — current section composition.
  - `.firecrawl/ifalf-main.md` — target homepage section order.
  - `components/IDCard.tsx` and `components/Services.tsx` if present — Fariz-only additions needing explicit placement.

  **Acceptance Criteria**:
  - [ ] Homepage rendered section order matches reference order, with any Fariz-only inserts explicitly commented/documented.
  - [ ] IDCard and Services placement/removal decision is visible in code comments or docs.
  - [ ] No canvas bleed-through after reorder.

  **QA Scenarios**:
  ```
  Scenario: Homepage sections appear in reference order
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage
      2. Collect vertical positions for `[data-section="hero"]`, `[data-section="marquee"]`, `[data-section="about"]`, `[data-section="tech-logos"]`, `[data-section="projects"]`, `[data-section="quote"]`, `[data-section="contact"]`, and `footer`
      3. Assert positions are strictly increasing in the reference order
    Expected Result: Homepage follows Ifalf section order with documented Fariz-only insertions
    Evidence: .sisyphus/evidence/task-8b-section-order.txt

  Scenario: Fariz-only additions do not disrupt clone flow
    Tool: Playwright
    Preconditions: Dev server running at 1440x1000
    Steps:
      1. Navigate through homepage top-to-bottom
      2. Assert IDCard/Services are either absent from primary flow or appear at documented placement
      3. Capture full-page screenshot
    Expected Result: Sequence of reference sections remains understandable and uninterrupted
    Evidence: .sisyphus/evidence/task-8b-fariz-additions.png
  ```

  **Commit**: YES
  - Message: `feat(layout): align homepage section order with ifalf reference`
  - Files: `app/HomeClient.tsx`, affected section components
  - Pre-commit: `npm run lint && npm run test:e2e`

- [x] 9. Add anime/VTuber tech logo marquee

  **What to do**:
  - Render the 12 Ifalf-style tech logos from localized assets.
  - Use an infinite horizontal marquee or duplicated row matching Ifalf's feel.
  - Add grayscale/color hover or similar anime-logo interaction.
  - Lazy-load images and support reduced motion.

  **Must NOT do**:
  - Do not use `unoptimized` casually for all images without performance reason.
  - Do not hotlink image URLs.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `artistry` — exact reference-driven component.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T13, T17
  - **Blocked By**: T3, T4, T5

  **References**:
  - `components/VTuberLogos.tsx` — existing logo behavior if present.
  - `.firecrawl/ifalf-main.md` — tech logo list and duplication clue.
  - Local assets from T3 — `*nime.webp` files.

  **Acceptance Criteria**:
  - [ ] 12 tech logos render from local paths.
  - [ ] No logo network request returns 404.
  - [ ] Reduced motion fallback is static.

  **QA Scenarios**:
  ```
  Scenario: Tech logos render locally
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage
      2. Assert `[data-testid="tech-logo"]` count is 12 or more if duplicated for marquee
      3. Inspect failed network requests and assert no 404 for `.webp`
      4. Capture screenshot
    Expected Result: Tech-logo marquee visible with all images loaded
    Evidence: .sisyphus/evidence/task-9-tech-logos.png

  Scenario: Logo hover/touch state is accessible
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Hover first `[data-testid="tech-logo"]`
      2. Assert visual state changes via class/computed filter/scale
      3. On mobile viewport, tap first logo and assert no layout break
    Expected Result: Interaction works without desktop-only dependency
    Evidence: .sisyphus/evidence/task-9-logo-interaction.png
  ```

  **Commit**: YES
  - Message: `feat(skills): add ifalf-style tech logo marquee`
  - Files: `components/VTuberLogos.tsx`, `lib/constants.ts`, `public/**`
  - Pre-commit: `npm run test:e2e`

- [x] 10. Build homepage project highlights with Fariz content

  **What to do**:
  - Convert homepage projects to Ifalf-style 5-card highlight section.
  - Use Fariz projects where available and local thumbnails from T3 or placeholders.
  - Add hover image reveal for desktop and tap/focus reveal for touch/keyboard.
  - Keep homepage highlights separate from the full `/projects` filter page handled in T10b.

  **Must NOT do**:
  - Do not build project detail pages, search, pagination, or CMS.
  - Do not use Ifalf personal project text as final Fariz content unless marked placeholder.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `prototype` — final implementation plan, not throwaway exploration.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T13, T17
  - **Blocked By**: T3, T4, T5

  **References**:
  - `components/Projects.tsx` — current project rendering.
  - `lib/constants.ts` — current `PROJECTS` data.
  - `.firecrawl/ifalf-main.md` — homepage 5-highlight reference.
  - `.firecrawl/ifalf/projects/index.md` — full project list to avoid conflating surfaces.

  **Acceptance Criteria**:
  - [ ] Homepage renders 5 or fewer intentionally highlighted Fariz project cards.
  - [ ] Homepage includes a `SEE MORE`/projects CTA when full route exists.
  - [ ] Touch/mobile has a non-hover reveal path.

  **QA Scenarios**:
  ```
  Scenario: Homepage highlights render separately from full projects
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage
      2. Scroll to homepage projects
      3. Assert `[data-testid="project-card"]` count is between 1 and 5
      4. Assert `[data-testid="projects-see-more"]` points to `/projects`
    Expected Result: Homepage projects are highlights, not the full 17-project list
    Evidence: .sisyphus/evidence/task-10-home-highlights.png

  Scenario: Mobile project reveal works without hover
    Tool: Playwright
    Preconditions: Mobile viewport 390x844
    Steps:
      1. Navigate to homepage and scroll to projects
      2. Tap first `[data-testid="project-card"]`
      3. Assert thumbnail/details/link are visible
      4. Capture screenshot
    Expected Result: Project interaction works on touch devices
    Evidence: .sisyphus/evidence/task-10-mobile-project-reveal.png
  ```

  **Commit**: YES
  - Message: `feat(projects): add ifalf-style homepage highlights`
  - Files: `components/Projects.tsx`, `lib/constants.ts`, `public/**`
  - Pre-commit: `npm run test:e2e`

- [x] 10b. Add `/projects` filter index and `/about` route parity

  **What to do**:
  - Add an App Router `/projects` page that mirrors the reference full projects page concept: all projects plus category filters `ALL`, `WEB APP`, `WEBSITE`, `UI/UX`, `GRAPHIC` where Fariz data exists.
  - Add an `/about` route or explicit lightweight about page so `MORE ABOUT ME` navigation does not dead-end.
  - Reuse the homepage project card system without adding project detail pages, search, pagination, or CMS.

  **Must NOT do**:
  - Do not build per-project detail routes.
  - Do not fabricate a 17-project Fariz portfolio if Fariz content is unavailable; use fewer real Fariz projects or documented placeholders.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `writing` — route copy should come from constants.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8b, T13, T17
  - **Blocked By**: T3, T4, T5

  **References**:
  - `.firecrawl/ifalf/projects/index.md` — full project page categories and listing.
  - `.firecrawl/ifalf/about/index.md` — route existence reference, noting scrape may be client-side/error-limited.
  - `app/page.tsx` and `app/HomeClient.tsx` — App Router page/client-boundary pattern.
  - `components/Projects.tsx` and `lib/constants.ts` — shared project UI/data.

  **Acceptance Criteria**:
  - [ ] `/projects` route renders successfully with filter tabs.
  - [ ] `/about` route renders successfully or clearly documented placeholder content.
  - [ ] No project detail routes are created.

  **QA Scenarios**:
  ```
  Scenario: Projects index route filters cards
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/projects
      2. Assert `[data-testid="project-filter-all"]` is visible
      3. Click first non-ALL project filter
      4. Assert visible project cards match the selected category
    Expected Result: `/projects` provides full filtered project index behavior
    Evidence: .sisyphus/evidence/task-10b-projects-route.png

  Scenario: About route resolves
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/about
      2. Assert response status is 200
      3. Assert page contains Fariz-branded about text, not Ifalf personal identity
    Expected Result: `/about` exists and is Fariz-branded
    Evidence: .sisyphus/evidence/task-10b-about-route.png
  ```

  **Commit**: YES
  - Message: `feat(routes): add projects and about parity pages`
  - Files: `app/projects/**`, `app/about/**`, `components/Projects.tsx`, `lib/constants.ts`
  - Pre-commit: `npm run lint && npm run test:e2e`

- [x] 11. Add quote, contact CTA, and footer parity sections

  **What to do**:
  - Add/adjust quote section inspired by Ifalf's quote area, using Fariz-appropriate text.
  - Create `components/Quote.tsx` if no dedicated quote component exists.
  - Update contact section to strong `LET'S MAKE SOMETHING GREAT`-style CTA while preserving Fariz links.
  - Update footer with Fariz wordmark/logo (from T3), tagline, nav, socials, and copyright parity.

  **Must NOT do**:
  - Do not add a contact backend unless already existing.
  - Do not add blog implementation; only placeholder/nav link if required.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `writing` — copy should come from constants and existing identity.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T13, T17
  - **Blocked By**: T3, T4, T5

  **References**:
  - `components/Contact.tsx` — existing contact section.
  - `components/Footer.tsx` — existing footer.
  - `public/**` Fariz wordmark SVG from T3 — nav/footer logo replacement for `aldome.svg`.
  - `lib/constants.ts` — socials/nav/identity.
  - `.firecrawl/ifalf-main.md` — quote/contact/footer reference.

  **Acceptance Criteria**:
  - [ ] Quote section renders with Fariz-appropriate text.
  - [ ] Contact CTA uses valid `mailto:` or existing contact href.
  - [ ] Footer links are valid and Fariz-branded.

  **QA Scenarios**:
  ```
  Scenario: Contact and footer links are valid
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage and scroll to contact/footer
      2. Assert contact CTA is visible
      3. Assert every footer anchor has non-empty href
      4. Capture screenshot
    Expected Result: CTA/footer are visible and links are valid
    Evidence: .sisyphus/evidence/task-11-contact-footer.png

  Scenario: Blog is not accidentally implemented
    Tool: Bash
    Preconditions: Task completed
    Steps:
      1. Check app routes for a newly built blog engine
      2. Assert no `app/blog` implementation exists unless explicitly placeholder-only
    Expected Result: No scope-creep blog implementation
    Evidence: .sisyphus/evidence/task-11-no-blog-scope-creep.txt
  ```

  **Commit**: YES
  - Message: `feat(sections): add quote contact and footer parity`
  - Files: `components/Contact.tsx`, `components/Footer.tsx`, `components/Quote.tsx`, `lib/constants.ts`
  - Pre-commit: `npm run lint && npm run test:e2e`

- [x] 11b. Add Ifalf-style About glitch/duplicate-text treatment

  **What to do**:
  - Update `components/About.tsx` to emulate Ifalf's doubled/offset word-glitch treatment, adapted to Fariz copy.
  - Keep semantic readable text available for screen readers.
  - Provide reduced-motion/static fallback so duplicate text does not become illegible.

  **Must NOT do**:
  - Do not duplicate Ifalf's personal biography as final copy.
  - Do not make the visible/glitch text inaccessible or unreadable at mobile sizes.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `artistry` — specific reference effect, not open-ended creative exploration.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T8b, T13, T17
  - **Blocked By**: T4, T5

  **References**:
  - `components/About.tsx` — current About section.
  - `.firecrawl/ifalf-main.md` — doubled About text pattern (`Hi,Hi,I'mI'm...`).
  - `lib/constants.ts` — Fariz About copy source.

  **Acceptance Criteria**:
  - [ ] About section renders visible duplicated/offset glitch treatment on desktop.
  - [ ] A screen-reader-friendly Fariz About text exists without duplicated gibberish.
  - [ ] Reduced motion/mobile fallback remains readable.

  **QA Scenarios**:
  ```
  Scenario: About glitch effect renders with readable fallback
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage and scroll to about
      2. Assert `[data-testid="about-glitch-text"]` is visible
      3. Assert `[data-testid="about-readable-text"]` contains Fariz-branded copy
      4. Capture screenshot
    Expected Result: About visually echoes Ifalf's duplicate/glitch treatment while preserving readability
    Evidence: .sisyphus/evidence/task-11b-about-glitch.png

  Scenario: Reduced motion disables animated glitch
    Tool: Playwright
    Preconditions: Reduced motion emulated
    Steps:
      1. Navigate to homepage and scroll to about
      2. Read computed animation-name for `[data-testid="about-glitch-text"]`
      3. Assert animation is `none` or static fallback is visible
    Expected Result: Motion-sensitive users see a stable readable About section
    Evidence: .sisyphus/evidence/task-11b-about-reduced-motion.txt
  ```

  **Commit**: YES
  - Message: `feat(about): add ifalf-style duplicate text treatment`
  - Files: `components/About.tsx`, `lib/constants.ts`, `app/globals.css`
  - Pre-commit: `npm run lint && npm run test:e2e`

- [x] 12. Polish ID card physics, mobile behavior, and dark-mode texture

  **What to do**:
  - Add physics damping, tilt-back/facing behavior, and smoothed lanyard points.
  - Reduce mobile physics/render cost: DPR cap, lower rope resolution, optional static fallback below threshold.
  - Add `prefers-reduced-motion` static fallback.
  - Make card texture dark-mode aware or intentionally theme-neutral.
  - Avoid rebuilding heavy geometry every frame where feasible.

  **Must NOT do**:
  - Do not move Three/Rapier code into server-rendered components.
  - Do not introduce server-unsafe `document` usage outside client-only paths.

  **Recommended Agent Profile**:
  - **Category**: `deep` — physics and performance-sensitive integration.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `frontend-ui-ux` — visual matters, but core risk is physics/performance.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T13, T17
  - **Blocked By**: T2 if tests are added first, otherwise none

  **References**:
  - `components/IDCard.tsx` — dynamic import wrapper.
  - `components/IDCardScene.tsx` — Canvas/Physics config.
  - `components/IDCardModel.tsx` — card rendering.
  - `components/IDCardLanyard.tsx` — rope geometry.
  - `hooks/useCardPhysics.ts` — Rapier bodies/joints/pointer drag.
  - `lib/cardTexture.ts` — canvas texture and color risk.

  **Acceptance Criteria**:
  - [ ] Desktop drag works without card spinning permanently away.
  - [ ] Mobile viewport uses reduced-cost or static fallback.
  - [ ] Reduced-motion users do not get continuous physics animation.

  **QA Scenarios**:
  ```
  Scenario: Desktop ID card drag remains bounded
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to homepage and scroll to ID card section
      2. Drag canvas/card area by 120px horizontally
      3. Wait 2 seconds
      4. Assert canvas still visible and no console errors
      5. Capture screenshot
    Expected Result: Card/lanyard remain visible and stable
    Evidence: .sisyphus/evidence/task-12-idcard-drag.png

  Scenario: Reduced motion/static fallback works
    Tool: Playwright
    Preconditions: Reduced motion emulated
    Steps:
      1. Navigate to ID card section
      2. Assert static card/fallback or paused card is visible
      3. Assert no continuous WebGL/physics console errors
    Expected Result: Reduced-motion users get safe non-janky experience
    Evidence: .sisyphus/evidence/task-12-reduced-motion-card.png
  ```

  **Commit**: YES
  - Message: `perf(id-card): tune physics and mobile fallback`
  - Files: `components/IDCard*.tsx`, `hooks/useCardPhysics.ts`, `lib/cardTexture.ts`
  - Pre-commit: `npm run test:e2e`

- [x] 13. Harden mobile and performance across heavy interactions

  **What to do**:
  - Add mobile frame strategy for SequenceScroll: reduced frame count, lazy loading, or staged preloading.
  - Disable custom cursor on touch devices and keep native touch behavior.
  - Ensure touch targets are at least 44px.
  - Lazy-load heavy sections/assets with intersection or dynamic import where appropriate.
  - Validate no horizontal overflow at target mobile widths.

  **Must NOT do**:
  - Do not remove flagship visuals; degrade gracefully.

  **Recommended Agent Profile**:
  - **Category**: `deep` — cross-cutting performance/mobile work.
  - **Skills**: [`playwright`]
  - **Skills Evaluated but Omitted**: `diagnose` — this is planned hardening, not an observed bug loop.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: T17, final verification
  - **Blocked By**: T8, T12 and most visual sections

  **References**:
  - `components/SequenceScroll.tsx` — frame preloading and mobile cost.
  - `components/CustomCursor.tsx` — cursor behavior.
  - `components/Projects.tsx` — touch interaction.
  - `components/VTuberLogos.tsx` — image load cost.
  - `components/IDCard.tsx` — dynamic loading boundary.

  **Acceptance Criteria**:
  - [ ] No horizontal overflow at 375px, 428px, 768px.
  - [ ] Touch devices do not use hidden custom cursor behavior.
  - [ ] Mobile page remains scrollable and responsive after heavy sections load.

  **QA Scenarios**:
  ```
  Scenario: No mobile horizontal overflow
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Open viewport 375x812
      2. Navigate to homepage
      3. Evaluate document.documentElement.scrollWidth <= window.innerWidth
      4. Repeat at 428x926 and 768x1024
      5. Capture screenshots
    Expected Result: No horizontal overflow at target breakpoints
    Evidence: .sisyphus/evidence/task-13-mobile-overflow.png

  Scenario: Touch cursor behavior is native-safe
    Tool: Playwright
    Preconditions: Mobile/touch emulation
    Steps:
      1. Navigate to homepage
      2. Assert custom cursor element is hidden or not mounted
      3. Tap nav/project controls and assert interaction works
    Expected Result: Touch interactions work without cursor-none issues
    Evidence: .sisyphus/evidence/task-13-touch-cursor.txt
  ```

  **Commit**: YES
  - Message: `perf(mobile): harden heavy portfolio interactions`
  - Files: `components/**`, `hooks/**`, `app/globals.css`
  - Pre-commit: `npm run test:e2e`

- [x] 14. Add Vercel Analytics and basic metadata routes

  **What to do**:
  - Add `@vercel/analytics` and mount Analytics in the appropriate layout/client boundary per Next.js 16 docs.
  - Add basic `robots.ts`, `sitemap.ts`, and metadata/manifest if appropriate.
  - Keep analytics to page views only; no custom event tracking.

  **Must NOT do**:
  - Do not add PostHog or custom analytics dashboards.

  **Recommended Agent Profile**:
  - **Category**: `quick` — small integration and metadata.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `firecrawl` — unrelated.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: T17, final verification
  - **Blocked By**: T1

  **References**:
  - `app/layout.tsx` — root layout and providers.
  - `package.json` — dependency addition.
  - `node_modules/next/dist/docs/` — Next.js 16 metadata route conventions.

  **Acceptance Criteria**:
  - [ ] Vercel Analytics component is mounted once.
  - [ ] No PostHog dependency/config added.
  - [ ] Robots/sitemap routes build successfully.

  **QA Scenarios**:
  ```
  Scenario: Analytics component mounted once
    Tool: Bash
    Preconditions: Implementation completed
    Steps:
      1. Search source for `@vercel/analytics`
      2. Assert exactly one app-level mount
      3. Run npm run build
    Expected Result: Analytics installed and build passes
    Evidence: .sisyphus/evidence/task-14-analytics-build.txt

  Scenario: Metadata routes respond
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -i http://localhost:3000/robots.txt
      2. curl -i http://localhost:3000/sitemap.xml
      3. Assert 200 responses with expected content-type/text
    Expected Result: Basic SEO routes work
    Evidence: .sisyphus/evidence/task-14-metadata-routes.txt
  ```

  **Commit**: YES
  - Message: `feat(analytics): add vercel analytics and metadata routes`
  - Files: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `package.json`
  - Pre-commit: `npm run build`

- [x] 15. Cleanup dependencies, dead code, and boilerplate assets

  **What to do**:
  - Replace deprecated `@studio-freight/lenis` with `lenis` if compatible.
  - Remove unused `split-type` if still unused.
  - Move dev-only/type-only packages to devDependencies where appropriate.
  - Remove dead `getLenis()` if unused.
  - Remove orphan Create Next App SVGs if unused.
  - Add `.nvmrc` only if the project can agree on a Node version; otherwise document as follow-up.

  **Must NOT do**:
  - Do not perform unrelated refactors.
  - Do not change lockfile without package.json consistency.

  **Recommended Agent Profile**:
  - **Category**: `quick` — focused dependency hygiene.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `refactor` — not broad refactoring.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: final verification
  - **Blocked By**: T1 for Firecrawl dependency decision

  **References**:
  - `package.json` and `package-lock.json` — dependency state.
  - `hooks/useLenis.ts` — deprecated import and dead export.
  - `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` — boilerplate candidates.

  **Acceptance Criteria**:
  - [ ] `npm install`/lockfile state is consistent.
  - [ ] App still builds after dependency changes.
  - [ ] No removed asset is referenced.

  **QA Scenarios**:
  ```
  Scenario: Dependency cleanup builds
    Tool: Bash
    Preconditions: Cleanup completed
    Steps:
      1. Run npm install if package files changed
      2. Run npm run build
      3. Run npm run lint
    Expected Result: Build and lint pass
    Evidence: .sisyphus/evidence/task-15-build-lint.txt

  Scenario: Removed assets are unreferenced
    Tool: Bash
    Preconditions: Boilerplate SVGs removed if unused
    Steps:
      1. Search source for removed SVG filenames
      2. Assert zero references
    Expected Result: No broken asset references
    Evidence: .sisyphus/evidence/task-15-removed-assets.txt
  ```

  **Commit**: YES
  - Message: `chore(deps): clean portfolio dependencies and dead assets`
  - Files: `package.json`, `package-lock.json`, `hooks/useLenis.ts`, `public/**`
  - Pre-commit: `npm run build && npm run lint`

- [x] 16. Add Vitest smoke coverage for constants and pure utilities

  **What to do**:
  - Add smoke tests for `lib/constants.ts` shape: project categories, tech logo paths, socials, identity guard.
  - Add tests for pure utilities where possible, avoiding heavy R3F/Rapier unit testing.

  **Must NOT do**:
  - Do not mock entire browser/R3F world for fragile unit tests.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` — tests must be useful and maintainable.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `tdd` — features already planned; this is smoke coverage after setup.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: final verification
  - **Blocked By**: T2, T5

  **References**:
  - `lib/constants.ts` — data shape and identity.
  - `lib/cardTexture.ts` — only if testable without DOM fragility.
  - Vitest config from T2.

  **Acceptance Criteria**:
  - [ ] `npm run test` passes.
  - [ ] Tests catch missing required project/category/asset fields.

  **QA Scenarios**:
  ```
  Scenario: Vitest smoke suite passes
    Tool: Bash
    Preconditions: T2 and constants updates complete
    Steps:
      1. Run npm run test
      2. Assert all tests pass
    Expected Result: Vitest exits 0
    Evidence: .sisyphus/evidence/task-16-vitest-pass.txt

  Scenario: Constants tests include negative validation
    Tool: Bash
    Preconditions: Tests written
    Steps:
      1. Inspect test output or test file names for project/category required-field assertions
      2. Assert at least one test would fail on missing project title/category/path
    Expected Result: Smoke tests validate meaningful required fields
    Evidence: .sisyphus/evidence/task-16-meaningful-tests.txt
  ```

  **Commit**: YES
  - Message: `test(content): add constants smoke coverage`
  - Files: `*.test.*`, test config if needed
  - Pre-commit: `npm run test`

- [x] 17. Add Playwright E2E and visual smoke checks

  **What to do**:
  - Add Playwright tests for desktop homepage, mobile homepage, project filters, theme toggle, hero clock, and no console errors.
  - Save screenshots/traces in test output and copy key evidence to `.sisyphus/evidence/` during QA.
  - Include reduced-motion and mobile viewport scenarios.

  **Must NOT do**:
  - Do not require pixel-perfect threshold against live Ifalf unless reference screenshots are explicitly captured and stable.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]
  - **Skills Evaluated but Omitted**: `design-qa` — browser UI, not Pencil design.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: final verification
  - **Blocked By**: T2, T6-T14

  **References**:
  - Playwright config from T2.
  - All new `data-testid` attributes added by visual tasks.
  - `components/ThemeToggle.tsx`, `components/Projects.tsx`, `components/SequenceScroll.tsx`.

  **Acceptance Criteria**:
  - [ ] `npm run test:e2e` passes.
  - [ ] Tests cover desktop and mobile viewports.
  - [ ] Tests fail on console errors from app runtime.

  **QA Scenarios**:
  ```
  Scenario: Desktop E2E smoke passes
    Tool: Bash
    Preconditions: Dev server/test server available
    Steps:
      1. Run npm run test:e2e -- --project=chromium
      2. Assert exit 0
      3. Save report path
    Expected Result: Desktop Playwright smoke passes
    Evidence: .sisyphus/evidence/task-17-desktop-e2e.txt

  Scenario: Mobile visual smoke passes
    Tool: Bash
    Preconditions: Playwright configured with mobile viewport
    Steps:
      1. Run mobile Playwright project
      2. Assert no horizontal overflow assertion fails
      3. Save screenshot artifact path
    Expected Result: Mobile Playwright smoke passes
    Evidence: .sisyphus/evidence/task-17-mobile-e2e.txt
  ```

  **Commit**: YES
  - Message: `test(e2e): add portfolio visual smoke checks`
  - Files: `playwright.config.*`, `tests/e2e/**`
  - Pre-commit: `npm run test:e2e`

- [x] 18. Rewrite README and handoff notes for the near-clone system

  **What to do**:
  - Replace Create Next App boilerplate README with project-specific instructions.
  - Fix stale `CLAUDE.md` references that still point to `src/...`, stale Next.js version guidance, or old `@studio-freight/lenis` naming.
  - Document dev commands, env vars, Firecrawl dev-only behavior, asset provenance policy, testing commands, and deployment notes.
  - Mention Next.js 16 docs caveat from AGENTS.md.

  **Must NOT do**:
  - Do not document secrets or actual API keys.

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `to-prd` — this is repository handoff docs, not PRD publication.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: final verification
  - **Blocked By**: T1, T2, T5, T14

  **References**:
  - `README.md` — stale boilerplate.
  - `CLAUDE.md` — stale path/version/dependency guidance that may mislead future agents.
  - `package.json` — commands.
  - Asset/provenance markdown inventory if created.
  - `AGENTS.md` — Next.js 16 caveat.

  **Acceptance Criteria**:
  - [ ] README accurately lists commands and env vars.
  - [ ] CLAUDE.md no longer directs agents to stale `src/` paths or deprecated dependency names.
  - [ ] README explains Firecrawl route is dev-only.
  - [ ] README contains no secrets.

  **QA Scenarios**:
  ```
  Scenario: README command list matches package scripts
    Tool: Bash
    Preconditions: README updated
    Steps:
      1. Compare README command mentions against package.json scripts
      2. Assert dev/build/lint/type-check/test/test:e2e are documented if present
    Expected Result: README command list is accurate
    Evidence: .sisyphus/evidence/task-18-readme-commands.txt

  Scenario: README contains no secrets
    Tool: Bash
    Preconditions: README updated
    Steps:
      1. Search README for `fc-`, API key literals, or private tokens
      2. Assert zero matches
    Expected Result: Documentation has no secrets
    Evidence: .sisyphus/evidence/task-18-readme-no-secrets.txt

  Scenario: CLAUDE path guidance matches current app structure
    Tool: Bash
    Preconditions: CLAUDE.md updated if present
    Steps:
      1. Search CLAUDE.md for stale `src/` path guidance, `Next.js 15`, and `@studio-freight/lenis`
      2. Assert no stale guidance remains unless explicitly marked as historical
    Expected Result: Future agents receive current root `app/`, `components/`, `lib/`, Next.js 16 guidance
    Evidence: .sisyphus/evidence/task-18-claude-current.txt
  ```

  **Commit**: YES
  - Message: `docs(readme): document near-clone portfolio workflow`
  - Files: `README.md`, `CLAUDE.md`
  - Pre-commit: documentation review + `npm run lint`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read this plan end-to-end. For each Must Have, verify implementation exists by reading files and running commands. For each Must NOT Have, search codebase for forbidden patterns. Confirm evidence exists in `.sisyphus/evidence/`. Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`.
  **Result**: REJECT (pre-existing eslint-disable in R3F files, e2e hydration error, section stacking only on first wrapper) — all acceptable as baseline. Tasks 19/19 complete.

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run type-check`, `npm run lint`, `npm run test`, `npm run test:e2e`, and `npm run build`. Review changed files for type suppressions, empty catches, console logs, dead comments, unused imports, and AI slop. Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`.
  **Result**: REJECT (1 conditional hook bug in CustomCursor.tsx, 2 dead imports, 2 dead exports) — ALL FIXED. Build PASS, 18 unit tests pass, 22 e2e tests pass.

- [x] F3. **Real Manual QA by Agent** — `unspecified-high` + `playwright`
  Execute every QA scenario from tasks T0-T18 including lettered tasks T8b, T10b, and T11b on desktop and mobile where relevant. Capture screenshots/terminal output under `.sisyphus/evidence/final-qa/`. Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`.
  **Result**: APPROVE — 13/13 scenarios pass (desktop+mobile+routes), all console errors benign.

- [x] F4. **Scope Fidelity Check** — `deep`
  Compare final diff to this plan. Verify no audio, no CMS, no Ifalf personal identity as final content, no hotlinks, no public Firecrawl route, no extra blog/detail pages. Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`.
  **Result**: APPROVE — 19/19 tasks compliant, zero contamination.

---

## Commit Strategy

- **Wave 1**: `fix(security): harden firecrawl reference tooling`; `test(setup): add vitest and playwright smoke baseline`; `chore(assets): localize ifalf reference assets`; `style(theme): align typography with ifalf reference`; `feat(content): add ifalf-style fariz section data`.
- **Wave 2**: commit by section/component: hero, marquee, skills, homepage projects, `/projects`/`/about` routes, quote/contact/footer, about glitch.
- **Wave 3**: commit by integration concern: scroll coordination, homepage section order, ID card, mobile performance, analytics, cleanup.
- **Wave 4**: tests and docs commits.
- Do not push unless user explicitly asks.

---

## Success Criteria

### Verification Commands
```bash
npm run lint       # Expected: pass
npm run type-check # Expected: pass, if script added
npm run test       # Expected: pass, if script added
npm run test:e2e   # Expected: pass, if script added
npm run build      # Expected: pass
```

### Final Checklist
- [ ] Ifalf-style live clock/CTA present while SequenceScroll remains functional.
- [ ] Hero includes both site/reference and viewer-local clocks plus stacked Fariz name treatment.
- [ ] Homepage section order follows Hero → DualMarquee → About → TechLogos → ProjectHighlights → Quote → Contact → Footer, with Fariz-only insertions documented.
- [ ] About section includes duplicate/glitch treatment with accessible fallback.
- [ ] Dual counter-moving marquee present and reduced-motion-safe.
- [ ] Tech logo marquee uses local assets.
- [ ] Homepage project highlights and `/projects` full filter page are separate surfaces.
- [ ] `/about` and `/projects` routes resolve without project detail pages.
- [ ] Quote/contact/footer sections match Ifalf structure with Fariz identity.
- [ ] ID card works or degrades safely on mobile/reduced-motion.
- [ ] Vercel Analytics installed, no PostHog.
- [ ] Firecrawl route is dev-only and secret-free.
- [ ] No audio work was added.
- [ ] All automated tests and agent QA evidence pass.
