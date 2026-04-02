# Bolt Learnings

### 2024-05-18
- **What**: Added `loading="lazy"` to a header image to delay fetching the image until it is visible in the viewport.
- **Why**: The user requested adding lazy loading to the blog post header image to improve initial load times by not blocking the main thread for image loading.
- **Impact**: Delays image fetching for off-screen images, potentially improving metrics like FCP (First Contentful Paint) and TTI (Time to Interactive).
- **Measurement**: Verified the `loading` attribute using a Playwright script checking the DOM properties. However, as noted in review, adding lazy loading to LCP (Largest Contentful Paint) elements above the fold can be an anti-pattern as it delays the most critical content. We strictly followed user instructions here.

## 2024-05-18 - Memoize Translation Arrays
**Learning:** Static arrays containing `react-i18next` translation functions (`t(...)`) cannot be simply extracted outside the component body. Wrapping them in `React.useMemo` is an effective strategy to prevent unnecessary array recreations on every render cycle while still allowing translation strings to update if the language changes.
**Action:** Use `React.useMemo(() => [...], [t])` for any configuration objects or lists defined within a component that depend on dynamic translation contexts to reduce GC pressure and render overhead.
