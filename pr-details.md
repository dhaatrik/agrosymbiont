Title: 🧹 [Code Health] Extract ContactInfoItem to reduce deeply nested logic in ContactPage

Description:
🎯 **What:** Extracted the deeply nested and duplicated contact information items (MapPin, Phone, Mail wrappers) from `ContactPage` into a new modular functional component, `ContactInfoItem`.
💡 **Why:** This refactoring reduces repetitive markup, abstracts styling details, and flattens the previously deeply nested JSX structure within `ContactPage`. It improves overall codebase readability and makes it easier to modify the layout or styling of contact items consistently.
✅ **Verification:** Verified by checking that `pnpm test` successfully executed all 239 tests (including the 5 tests targeting `pages/ContactPage.test.tsx`), guaranteeing no breaking functional regressions were introduced. Also confirmed type checking with TypeScript.
✨ **Result:** A much cleaner `ContactPage` file with reduced lines of code dedicated to structural boilerplate, enabling faster future modifications and ensuring compliance with the DRY (Don't Repeat Yourself) principle.
