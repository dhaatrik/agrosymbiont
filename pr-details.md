Title: 🧹 [Code Health] Extract nested conditional logic for step indicator styling

## Description

🎯 **What:**
The issue of deeply nested conditional logic within `pages/OnboardingPage.tsx` at line 75 has been addressed. The inline ternary operations used to define styling classes for step markers and labels based on `isCompleted` and `isCurrent` states have been extracted into two independent helper functions: `getStepIndicatorClasses` and `getStepLabelClasses`.

💡 **Why:**
Extracting complex formatting conditionals from inline JSX improves the readability and maintainability of the component. The helper functions abstract away logic details and separate the concern of calculating CSS classes from the React component structure itself.

✅ **Verification:**
Verified the changes visually by running the application and navigating through the multi-step form to ensure all styling states remain accurate without regressions. Additionally, the existing test suite (`pages/OnboardingPage.test.tsx`) alongside all 239 repository tests successfully passed (`pnpm test`).

✨ **Result:**
The `OnboardingPage` component JSX is now cleaner and easier to parse. Future stylistic changes or new logic conditions for step markers can be maintained cleanly in isolated helper functions instead of muddying the UI structure.