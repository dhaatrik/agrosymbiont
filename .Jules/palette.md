## 2025-03-11 - Missing ARIA Labels on Navigation and Modal Close Buttons
**Learning:** Found instances where interactive elements like image carousel navigation buttons (chevron icons) and modal/popup close buttons (X icons) were lacking accessible names. Since they only contained SVGs, screen readers wouldn't know their purpose.
**Action:** Always ensure that icon-only buttons (like carousels or modals) have a descriptive `aria-label` so that their function is explicitly clear to assistive technologies.
## 2024-03-13 - SVG Markers in React Simple Maps lack keyboard accessibility
**Learning:** Custom SVG `<Marker>` elements in `react-simple-maps` are not natively focusable or interactive for keyboard users, even if an `onClick` handler is provided. Screen readers will skip them, and keyboard users cannot trigger them.
**Action:** Always manually add `tabIndex={0}`, an `onKeyDown` handler (listening for 'Enter' or ' '), and an `aria-label` to interactive SVG map markers to ensure full accessibility. Also, ensure a visible focus state is applied using utilities like `focus-visible:ring-2`.
