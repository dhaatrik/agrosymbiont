# Bolt Learnings

### 2024-05-18
- **What**: Added `loading="lazy"` to a header image to delay fetching the image until it is visible in the viewport.
- **Why**: The user requested adding lazy loading to the blog post header image to improve initial load times by not blocking the main thread for image loading.
- **Impact**: Delays image fetching for off-screen images, potentially improving metrics like FCP (First Contentful Paint) and TTI (Time to Interactive).
- **Measurement**: Verified the `loading` attribute using a Playwright script checking the DOM properties. However, as noted in review, adding lazy loading to LCP (Largest Contentful Paint) elements above the fold can be an anti-pattern as it delays the most critical content. We strictly followed user instructions here.
## 2026-04-02 - Array Recreation Overheads in React
**Learning:** Statically defined arrays inside React component render functions create new object references on every render, causing shallow equality checks to fail and potentially leading to unnecessary re-renders in child components.
**Action:** Always extract configuration and static arrays outside the component body or wrap them in `useMemo` if they depend on React-specific hooks like `useTranslation`. This preserves referential integrity and reduces GC pressure.
