## 2024-03-12 - [React Re-renders on Scroll]
**Learning:** Attaching a window 'scroll' event listener that triggers a React state update (e.g., `setScrollY`) at the root `Layout` component level is a severe performance bottleneck. It causes the entire application tree to re-render synchronously on every scroll tick, causing noticeable jank.
**Action:** Always prefer off-main-thread or composition-level solutions for scroll animations. Use Framer Motion's `useScroll` and `useTransform` to bind scroll progress directly to a `<motion.div>`'s style, bypassing the React render cycle entirely.

## 2026-03-13 - [Inline Array Creation in Render Loop]
**Learning:** Re-creating a large array and hundreds of object literals inside a `requestAnimationFrame` loop causes extreme garbage collection pressure, as JavaScript has to allocate and destroy these objects 60 times a second, leading to micro-stutters and frame drops.
**Action:** When working with canvas animations or high-frequency loops, pre-allocate arrays and objects outside the loop. Modify the properties of these pre-allocated objects in place during the loop to avoid continuous memory allocations.
## 2026-03-12 - [Inline Array Creation in Render Loop]
**Learning:** Creating arrays inline during a render cycle (especially within `.map()`) can cause unnecessary garbage collection (GC) pressure. This is particularly impactful when the array is static or its length doesn't change based on component state.
**Action:** Move static data generation outside of the component or use `useMemo` to ensure the data is only created once. This reduces memory allocations and improves performance by preventing the creation of new array instances on every render.

2024-05-24
Avoid creating array instances (e.g., `[...Array(n)]` or `Array.from({ length: n })`) inline within a React component's render loop when rendering a static or unchanging number of items. This causes unnecessary allocations on every render cycle, leading to increased Garbage Collection pressure. Pre-allocate such arrays statically outside the component when possible.

## 2026-03-14 - [React State Updates on Native Scroll Event]
**Learning:** Attaching a native `window.addEventListener('scroll', ...)` that triggers a React state update (e.g. `setIsVisible` in `BackToTopButton`) causes synchronous React re-renders on every scroll tick. This blocks the main thread and can cause noticeable scroll jank.
**Action:** Always prefer off-main-thread or composition-level solutions for scroll interactions. Use Framer Motion's `useScroll` and `useMotionValueEvent` which are optimized, batch read/write operations utilizing `requestAnimationFrame`, and prevent constant component re-renders.

## 2024-05-20 - Extracting redundant trig computations in high-frequency loops
**Learning:** In highly animated canvas components (like `ThreeDBackground`), inline trigonometric calculations (e.g., `Math.sin`, `Math.cos`) inside loops that run every frame via `requestAnimationFrame` cause severe CPU strain. For 500 particles, calculating 4 rotation values inline means 2,000 unnecessary trig operations per frame (120,000 per second at 60fps).
**Action:** Always precalculate frame-constant values (like rotations) outside the particle loop, and precalculate particle-constant values (like unit vectors) at creation time, storing them on the particle object to eliminate thousands of operations per frame.
