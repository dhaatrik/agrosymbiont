## 2026-04-16 - Memoizing Dynamic Form Children
**Learning:** In highly dynamic, monolithic React forms (like ContactForm using a single `useState` object for all form fields bound via `useContactForm`), failing to memoize presentation wrappers like `FormField` results in an O(n) re-render cost for the entire form on every keystroke, where n is the number of inputs.
**Action:** Always verify that repetitive presentation wrappers used within monolithic form state handlers are wrapped in `React.memo` to restrict re-rendering solely to the input actively being typed in.

## 2025-05-14 - Removing Artificial Loading Delays
**Learning:** Artificial delays using `setTimeout` in `useEffect` to show skeleton loaders negatively impact perceived performance by forcing a wait even when data is available.
**Action:** Initialize loading states to `false` if data is static or immediately available, and remove simulated delay logic to improve responsiveness.
