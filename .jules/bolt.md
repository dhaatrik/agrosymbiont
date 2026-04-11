## YYYY-MM-DD - [Pre-calculating Math.PI vs avoiding String allocation]
**Learning:** Pre-calculating `Math.PI * 2` inside tight loops offers no measurable performance gain since V8 compiler optimizes constant arithmetic automatically. Conversely, replacing string concatenation (`rgba(...)`) with `ctx.globalAlpha` in hot rendering loops eliminates garbage collection pressure and repeated browser parsing.
**Action:** Focus on reducing garbage collection overhead and string concatenation in rendering loops, and avoid redundant micro-optimizations like extracting `Math.PI * 2` outside of loops unless benchmarking proves otherwise.

## 2025-03-09 - Remove Artificial Form Submission Delay

**Learning:** When removing a simulated API delay (`setTimeout`) from a form submission handler to make the logic synchronous, React state updates (like removing `isSubmitting=true` then `isSubmitting=false`) become instantaneous. Associated unit tests must be explicitly updated to remove `waitFor` assertions for "Submitting..." and instead assert the final success state synchronously to prevent false negative test failures.
**Action:** When converting asynchronous form submissions to synchronous logic (e.g., removing simulated delays), always eliminate redundant loading states (like `isSubmitting`), remove the `async` keyword, and update associated unit tests to assert success states immediately rather than using `waitFor`.

## 2024-05-19 - [Failed Optimization: Memoizing deeply coupled callbacks]
**Learning:** Attempting to memoize buttons in the onboarding flow (`StepCrop.tsx`, etc.) failed because the `onClick` handler (`handleSelect`) inherently depends on a frequently changing array (`selections`). Wrapping the handler in `useCallback` with `selections` as a dependency creates a new function reference every time the array updates, instantly invalidating the `React.memo` equality check.
**Action:** When evaluating components for `React.memo`, thoroughly trace the dependency chain of any passed callbacks. If a callback depends on state that changes on every interaction, memoization is ineffective unless the state setter is refactored to use a functional update (e.g., `setSelections(prev => ...)`).
