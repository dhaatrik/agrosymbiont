## PR Title
🧹 Code Health: Extract FAQ items map to improve component readability

## PR Description

🎯 **What:** Extracted the deeply nested `faqs.map()` rendering logic into a separate `faqListItems` variable.
💡 **Why:** Reduces nesting within the JSX `return` block, improving component maintainability and readability by separating data processing from presentation layout.
✅ **Verification:** Verified by passing all unit tests for `FAQPage` and the broader codebase, successful type checking with `pnpm lint` (also fixing some pre-existing duplicate validation imports), and a clean build via `pnpm build`.
✨ **Result:** Improved separation of concerns and simpler component render function structure.
