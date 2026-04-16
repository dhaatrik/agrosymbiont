## 2026-04-16 - Memoizing Dynamic Form Children
**Learning:** In highly dynamic, monolithic React forms (like ContactForm using a single `useState` object for all form fields bound via `useContactForm`), failing to memoize presentation wrappers like `FormField` results in an O(n) re-render cost for the entire form on every keystroke, where n is the number of inputs.
**Action:** Always verify that repetitive presentation wrappers used within monolithic form state handlers are wrapped in `React.memo` to restrict re-rendering solely to the input actively being typed in.
