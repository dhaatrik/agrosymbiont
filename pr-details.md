* **Title:** "🧹 [Code Health] Extract inline button logic and styles in InvestorContactForm"
* **Description:**
  * 🎯 **What:** Extracted the deeply nested ternary logic for the `<button>` inner content into a `renderButtonContent` function, and separated the long inline class string into a `buttonClasses` variable within `InvestorContactForm.tsx`.
  * 💡 **Why:** Reduces render method complexity, improves code readability, and makes the button states easier to maintain by removing massive inline expressions.
  * ✅ **Verification:** Confirmed by running tests specifically on `InvestorContactForm` component successfully without regressions.
  * ✨ **Result:** A cleaner component structure with more readable template JSX.