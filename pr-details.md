Title: ⚡ Bolt: Memoize static translation arrays to reduce React render overhead

Description:
💡 **What**: Wrapped statically defined configuration arrays containing `react-i18next` translation functions (`t(...)`) in `useMemo` hooks inside `CropProblemSolver.tsx`, `StepChallenge.tsx`, `StepCrop.tsx`, `StepSoilType.tsx`, and `StepFarmSize.tsx`.
🎯 **Why**: Because the arrays included translation calls, they were previously being recreated on every component render cycle. Extracting them purely outside the component body wasn't feasible without wrapping them in functions (which would still run on every render). By memoizing them with `useMemo`, we preserve exactly one instance of the array reference until the translation dependencies change.
📊 **Impact**: Reduces unnecessary array allocations and garbage collection (GC) pressure, especially critical during heavy re-renders or Framer Motion animations in the onboarding flow.
🔬 **Measurement**: Verify by running `pnpm test` (all tests pass) and profiling component re-renders during interactions using React DevTools Profiler, observing fewer deep object diffs.