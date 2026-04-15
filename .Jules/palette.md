## 2026-04-15 - Focus Visibility on Custom File Input Wrappers
**Learning:** When hiding native `<input type="file">` elements using utility classes like `sr-only` and using a `<label>` as a custom wrapper/button, the element loses visible focus when navigated to via keyboard.
**Action:** Always apply `focus-within:ring-2 focus-within:ring-offset-2` utility classes to the custom `<label>` or wrapper element to ensure keyboard accessibility.
