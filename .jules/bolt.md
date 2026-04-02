# Bolt Learnings

### 2024-05-18
- **What**: Added `loading="lazy"` to a header image to delay fetching the image until it is visible in the viewport.
- **Why**: The user requested adding lazy loading to the blog post header image to improve initial load times by not blocking the main thread for image loading.
- **Impact**: Delays image fetching for off-screen images, potentially improving metrics like FCP (First Contentful Paint) and TTI (Time to Interactive).
- **Measurement**: Verified the `loading` attribute using a Playwright script checking the DOM properties. However, as noted in review, adding lazy loading to LCP (Largest Contentful Paint) elements above the fold can be an anti-pattern as it delays the most critical content. We strictly followed user instructions here.
## 2024-05-19 - Un-memoized configuration objects breaking React.memo
**Learning:** In React functional components, defining configuration arrays or objects inline that depend on external functions (like `t` from `useTranslation`) causes those objects to be recreated on every single render. This silently defeats `React.memo` in any child components that receive those objects as props, as the shallow equality check will always fail.
**Action:** When creating configuration data inside a component that must react to dynamic data (like translations), wrap it in `React.useMemo` with the appropriate dependencies to stabilize the object reference.
