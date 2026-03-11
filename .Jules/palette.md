## 2025-03-11 - Missing ARIA Labels on Navigation and Modal Close Buttons
**Learning:** Found instances where interactive elements like image carousel navigation buttons (chevron icons) and modal/popup close buttons (X icons) were lacking accessible names. Since they only contained SVGs, screen readers wouldn't know their purpose.
**Action:** Always ensure that icon-only buttons (like carousels or modals) have a descriptive `aria-label` so that their function is explicitly clear to assistive technologies.
