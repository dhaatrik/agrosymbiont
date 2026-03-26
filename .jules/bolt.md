# 2024-03-26
- **What**: Replaced `Math.sqrt()` inside `renderConnections` line opacity rendering in `components/ThreeDBackgroundHelpers.ts`.
- **Why**: `Math.sqrt` was called thousands of times per frame inside an $O(N^2)$ pseudo-loop. Modifying the drop-off opacity curve to use `distSq` directly achieved functionally equivalent visuals while drastically decreasing CPU load.
- **Impact**: Increased rendering speed inside the inner loop by reducing complex math calculations.
- **Measurement**: Vitest local `bench` mode verified a measurable performance improvement for `renderConnections`.
