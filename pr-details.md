# ⚡ Bolt: Memoize static configuration arrays in React components

💡 **What:** Wrapped static configuration arrays and objects that rely on the `t()` translation function inside `useMemo` hooks with a `[t]` dependency array across multiple UI components (`StepChallenge`, `StepCrop`, `StepSoilType`, `StepFarmSize`, `CropProblemSolver`).

🎯 **Why:** These configuration arrays were previously being redefined on every single render loop. Because they depend on translations, they couldn't simply be moved outside the component body. Using `useMemo` prevents continuous object recreation, reducing garbage collection pressure and unnecessary virtual DOM diffing while still responding to language toggles.

📊 **Impact:** Reduces memory allocation per render cycle for these components. This prevents recreation of objects passed as props (like arrays to mapping functions) and prevents subsequent cascading re-renders in optimized child components.

🔬 **Measurement:** Verify by ensuring the UI components continue to work as expected, and test switching the language toggle to ensure translated text updates correctly. Tests pass successfully.
