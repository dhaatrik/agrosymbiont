# Title
⚡ Bolt: Memoize CropProblemSolver configurations to fix SymptomButton re-renders

# Description
💡 **What:** Wrapped `cropOptions`, `symptomOptions`, and `solutions` objects inside `components/CropProblemSolver.tsx` in `React.useMemo` hooks.
🎯 **Why:** These configuration objects, which depend on the `t` (translation) function, were previously defined inline and recreated on every single render. This caused the shallow equality checks in the memoized child component (`SymptomButton`) to fail continuously, resulting in unnecessary re-renders of all buttons whenever the selection state changed.
📊 **Impact:** Reduces unnecessary re-renders of the `SymptomButton` components to exactly 0 when unselected options remain unselected, significantly decreasing React reconciliation overhead during user interaction.
🔬 **Measurement:** Verified via React DevTools Profiler that interacting with the buttons no longer causes re-renders of un-modified sibling elements. Also verified against the full `pnpm test` suite to ensure no regressions in behavior.
