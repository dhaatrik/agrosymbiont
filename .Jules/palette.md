## 2024-05-24 - Interactive Navigation Elements Missing Keyboard Focus Indication
**Learning:** Native `<select>` and `<button>` elements that act as toggles in navigation headers (like Language selector, Dark mode toggle) often lose distinct visible focus when custom Tailwind styling resets are applied without explicitly defining `focus-visible` variants. This makes keyboard navigation through top-level navigation highly confusing as users cannot tell which tool is active.
**Action:** Always explicitly define `focus-visible:ring-2` (and related offset/color utility classes) alongside `focus:outline-none` on all interactive UI controls, especially when they only contain icons or have heavily customized non-standard appearances.

## 2025-03-18 - Added keyboard focus states to JobCard apply button
**Learning:** Found an accessibility issue pattern where standard interactive elements (like the "Apply Now" button on the Job Card) had extensive hover styles but no focus indicator styles making keyboard navigation very difficult.
**Action:** When adding keyboard focus states to standard interactive HTML elements (like buttons) in this codebase, use Tailwind 'ring' utilities (e.g., 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue'). For SVGs, use 'outline' utilities instead.

## 2025-03-18 - Missing focus states on custom selectable cards (Onboarding Flow)
**Learning:** Found an accessibility pattern in the onboarding flow where `motion.button` and regular `button` elements acting as large selectable cards completely lacked focus indicators, rendering keyboard navigation invisible during the primary user journey. Custom heavily-styled interactive cards often drop native focus styles.
**Action:** When creating custom interactive selection cards or complex radio buttons using `framer-motion` or Tailwind, always explicitly append `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` (and appropriate theme colors) to ensure keyboard visibility is preserved.
## 2024-03-21 - [Accessibility: Link accordion controls with aria-controls]
**Learning:** Screen readers rely on `aria-controls` to navigate from a toggle button (with `aria-expanded`) to the specific content panel it reveals. Without this explicit linkage, users may not know where the expanded content appeared in the DOM, making navigation of complex layouts like FAQs confusing.
**Action:** When implementing custom accordion or disclosure patterns, always ensure the `<button>` includes `aria-controls="[panel-id]"` matching the `id` of the collapsible content `<div>`.

## 2025-03-22 - Missing keyboard focus states on primary form action buttons
**Learning:** Found an accessibility pattern across multiple form components (`InvestorContactForm`, `ContactForm`, `JobApplicationForm`) where the primary `type="submit"` buttons (and success state buttons like "Submit another inquiry") had elaborate hover and shadow states but completely lacked focus indicators. This makes submitting forms via keyboard navigation unpredictable as users cannot tell if the button has received focus.
**Action:** Always explicitly define `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` (and appropriate color variants) on all primary form action buttons to ensure keyboard visibility is preserved.

## 2025-03-22 - Screen reader unfriendliness with dynamic results and errors
**Learning:** Found an accessibility issue pattern where conditionally rendered form field errors, global form errors, and async operation results (like the Crop Problem Solver diagnosis) appear visually but are completely silent to screen readers.
**Action:** Always wrap dynamic form field errors in `<div aria-live="polite">` (or `<p aria-live="polite">`) and use `role="alert"` on top-level global error summaries. Ensure async interactive tools that show results without reloading the page also present those results within an `aria-live="polite"` region.

## 2025-03-25 - Focus rings on interactive elements in constrained layouts
**Learning:** Found an accessibility issue where interactive elements in headers (like language selectors and toggle buttons) had `focus-visible:ring-2` applied but the focus ring was visually clipped or invisible because it was painted outwards in a tightly packed or overflow-hidden container.
**Action:** When adding keyboard focus states to interactive elements in constrained layouts (like top navigation bars), append `focus-visible:ring-inset` alongside the standard `focus-visible:ring-2` to ensure the focus indicator is painted inwards and remains fully visible to keyboard users.
