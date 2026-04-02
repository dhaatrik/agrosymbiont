# Bolt Learnings

### 2024-05-18
- **What**: Added `loading="lazy"` to a header image to delay fetching the image until it is visible in the viewport.
- **Why**: The user requested adding lazy loading to the blog post header image to improve initial load times by not blocking the main thread for image loading.
- **Impact**: Delays image fetching for off-screen images, potentially improving metrics like FCP (First Contentful Paint) and TTI (Time to Interactive).
- **Measurement**: Verified the `loading` attribute using a Playwright script checking the DOM properties. However, as noted in review, adding lazy loading to LCP (Largest Contentful Paint) elements above the fold can be an anti-pattern as it delays the most critical content. We strictly followed user instructions here.

## 2024-05-18 - Extract static data arrays outside React components
**Learning:** When statically defined objects or arrays (like configuration lists or mock data) are placed inside a React functional component, they are needlessly reallocated on every single render cycle. This creates unnecessary work for the garbage collector, especially for arrays of objects.
**Action:** When acting as a performance agent, hoist static configurations and arrays outside of the component body to preserve reference equality across renders. Always include an explanatory comment as per prompt constraints.
