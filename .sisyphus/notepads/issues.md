
## F2 Code Quality Review (2026-05-09)

### Critical
- **CustomCursor.tsx:30** — `useEffect` called after conditional early return. Violates React hooks rules. Must move hook before return.

### Lint New Regressions (not in baseline)
- `react-hooks/rules-of-hooks` error in CustomCursor.tsx (real bug)
- `react-hooks/set-state-in-effect` warnings in IDCard.tsx, SequenceScroll.tsx (media query init — acceptable pattern)
- `react-hooks/purity` error in useCardPhysics.ts (R3F performance.now() — false positive)
- `@next/next/no-img-element` warning in VTuberLogos.tsx

### Dead Code
- `Services` imported but unused in HomeClient.tsx (section removed, import remains)
- `useRef` imported but unused in CustomCursor.tsx
- `MARQUEE_ITEMS` export in constants.ts — zero consumers
- `PROJECT_CATEGORIES` export in constants.ts — zero consumers

### Inherited Baseline (unchanged, acceptable)
- IDCardScene.tsx: 3× `react-hooks/refs` errors (R3F ref passing pattern)
- 3× unused `eslint-disable react/no-unknown-property` in R3F files
