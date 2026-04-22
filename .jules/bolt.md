## 2026-04-22 - Optimize validation state updates
**Learning:** When updating form validation state (e.g., `setErrors` in custom hooks), explicitly check if the new error value matches the existing state value before returning a new object clone. Returning the previous state object directly when values haven't changed prevents unnecessary state thrashing and re-renders during high-frequency events like keystrokes.
**Action:** Always implement an early return in `setState` callbacks if the state conceptually hasn't changed.
