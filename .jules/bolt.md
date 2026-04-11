## 2025-04-11 - False Positive in Code Review for Unused State
**Learning:** The automated code review tool incorrectly assumed that removing the `isSubmitting` state declaration in `pages/InvestorsPage.tsx` would cause a `ReferenceError` in the JSX. However, the `isSubmitting` variable was never actually used in the component's render output.
**Action:** When the code review flags the removal of an unused state variable as a potential reference error, always manually verify the component's render function (e.g., via `grep` or `cat`) to confirm the variable is genuinely unused before attempting to address the feedback.

## 2025-04-11 - Mocking IntersectionObserver for Vitest Benchmarks
**Learning:** When running `vitest bench` on React components that use `framer-motion`'s viewport features (like `AnimatedSection`), the JSDOM/Vitest environment may throw a `ReferenceError: IntersectionObserver is not defined`, causing the benchmark to fail.
**Action:** When benchmarking such components, either mock `IntersectionObserver` globally in the test setup or avoid `vitest bench` entirely and use a standalone Node.js script with `performance.now()` to measure the specific logic you are optimizing.
