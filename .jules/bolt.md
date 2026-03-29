<<<<<<< bolt/remove-math-sqrt-11581113785764336320
# 2024-03-26
- **What**: Replaced `Math.sqrt()` inside `renderConnections` line opacity rendering in `components/ThreeDBackgroundHelpers.ts`.
- **Why**: `Math.sqrt` was called thousands of times per frame inside an $O(N^2)$ pseudo-loop. Modifying the drop-off opacity curve to use `distSq` directly achieved functionally equivalent visuals while drastically decreasing CPU load.
- **Impact**: Increased rendering speed inside the inner loop by reducing complex math calculations.
- **Measurement**: Vitest local `bench` mode verified a measurable performance improvement for `renderConnections`.
=======
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

## 2024-03-19 - [Array.prototype.forEach Overhead in Render Loops]
**Learning:** In high-frequency 60fps loops (e.g., canvas rendering using `requestAnimationFrame`), iterating over arrays with `Array.prototype.forEach` introduces unnecessary function call and closure overhead compared to standard indexed `for` loops. This can cause micro-stutters when iterating over hundreds of particles per frame.
**Action:** Always use standard indexed `for` loops (e.g., `for (let i = 0; i < array.length; i++)`) instead of array iteration methods like `forEach` or `map` within performance-critical animation loops.

## 2025-03-02 - [Math.min within Inner Loop]
* **What**: Pre-calculated the upper loop bound (`Math.min`) in `renderConnections` outside the inner loop.
* **Why**: The function `renderConnections` is called frequently (in a 60fps loop via `requestAnimationFrame`) and iterating over particles involves an inner loop whose maximum iteration limit is `Math.min(i + connectionWindow, projectedParticles.length)`. By computing this `Math.min` once outside the `j` loop, we reduce redundant calculations and improve the benchmark throughput from ~9,014 ops/sec to ~14,513 ops/sec.
* **Impact**: ~60% increase in operations per second for the connection drawing logic without any loss in visual quality or functional correctness.
* **Measurement**: Used `vitest bench` on a temporary `ThreeDBackgroundHelpers.bench.tsx` file.

## 2024-03-21 - Canvas Render Loop Optimization
**Learning:** Found a critical performance bottleneck in high-frequency 60fps canvas animation loops (`renderDustParticles`). Math functions like `Math.abs` and redundant basic arithmetic (like multiplying constants or division by 2) inside inner particle iteration loops significantly compound CPU strain.
**Action:** When implementing or modifying `requestAnimationFrame` render loops, forcefully hoist all frame-invariant calculations (like `width / 2` or `scrollY * 0.3`) outside the inner loop. Cache any repeating expensive math (like `Math.abs(p.z) / 1000`) into a local block variable rather than recalculating it per usage.

## 2026-03-24 - [Avoid Redundant Math/Property Access in Inner Loops]
**Learning:** Checking boundary conditions (like `dx > 80 || dx < -80`) before computing `dy` and squaring the differences can provide an easy early exit for rendering logic that drastically reduces performance overhead. Additionally, saving property accesses like `p1.x` as `p1x` avoids dynamic property resolutions on the objects during thousands of iterations per frame. Finally, instead of computing `Math.sqrt()` immediately for every candidate particle, computing squared distances `distSq < 6400` ensures expensive Math operations are only evaluated when strictly necessary.
**Action:** When working on rendering or O(n²) loop code paths, aggressively delay expensive calculations (`Math.sqrt`), manually inline simple threshold checks (`val > 80 || val < -80` over `Math.abs(val) > 80`), cache frequently accessed array or object properties locally inside the block, and pre-evaluate mathematical quotients (`0.12 / 80`) beforehand.

## 2026-03-22 - [Unmemoized Localization Map in Breadcrumbs]
**Learning:** Creating a new `Record<string, string>` object for route name mappings on every render (especially when it calls internationalization functions like `t()`) causes unnecessary memory allocations and garbage collection pressure. This is particularly wasteful if the object is used for static lookups within the render cycle.
**Action:** Wrap such lookup objects in `useMemo` with appropriate dependencies (like the `t` function from `useTranslation`) to ensure the object is only re-created when strictly necessary, reducing memory churn and improving render performance.
## 2026-03-24 - [Array.from Overhead in Initialization Loops]
**Learning:** In high-frequency 60fps loops (like those initializing particles using `Array.from` combined with a mapping callback), allocating hundreds of objects via mapping callback inside `Array.from` incurs measurable performance overhead (function creation and invocation per element).
**Action:** When initializing large sets of items in performance critical paths, replace `Array.from` mapping patterns with pre-allocating an array using `new Array(count)` and explicitly populating it within a standard `for` loop to avoid the closure and callback overhead.

## 2024-05-25 - [Missing Lazy Loading on Below-The-Fold Images]
**Learning:** Rendering below-the-fold images without `loading="lazy"` forces the browser to download all heavy assets simultaneously during the initial page load. This blocks the main thread and severely degrades the Time to Interactive (TTI) and First Contentful Paint (FCP) metrics.
**Action:** Always include the `loading="lazy"` attribute on `<img>` tags that are not immediately visible in the initial viewport (e.g., gallery items, related posts, deep page content) to defer loading until the user scrolls near them.

## 2025-03-05 - [Missing React.memo on FAQ List Items]
**Learning:** Rendering a list of items (like FAQs) where state resides in the parent (e.g. `openIndex` in `FAQPage`) causes all children in the list to re-render synchronously whenever the state changes. For components without memoization, this can significantly delay time-to-interactive for high frequency actions like toggles.
**Action:** When a parent component manages state for a list of items and passes handlers/data to them, wrap the individual list item component in `React.memo` and ensure that all callbacks passed to the children are wrapped in `React.useCallback`.
>>>>>>> main

## 2026-03-24 - [Hoisting invariant arithmetic out of 60FPS loops]
**Learning:** Found redundant math and divisions within the inner loop of `updateAndProjectSphereParticles` inside a 60FPS `requestAnimationFrame` loop. Frame-invariant calculations like `width / 2` and `scrollY * 0.15` were recalculated for every single particle on every single frame.
**Action:** Hoist these static values to local constants right before the loop body. For instance, define `const halfWidth = width / 2;` outside the loop to eliminate thousands of useless division operations and optimize rendering throughput.

## 2026-03-24 - [Avoid Array.from and Inline Component Mapping for List Overheads]
**Learning:** Initializing small static arrays with `Array.from` incurs a functional callback overhead compared to `new Array()` with a traditional `for` loop. Additionally, when mapping over arrays to render child elements (e.g., SVG Markers on a Map) that contain inline callbacks updating the parent state, every state update (e.g., selecting a marker) causes all child elements in the array to re-render.
**Action:** Replace `Array.from` with standard loop initialization in critical animation setups. Extract inline mapped components into separate `<ChildComponent>` items wrapped with `React.memo` and pass them a stable `useCallback` handler from the parent. This prevents massive re-renders across the mapped elements when selecting a single item.

## 2024-03-24
Memoizing React Context provider values using useMemo and wrapping toggle functions using useCallback improves performance by preventing unnecessary re-renders in all consuming components.
