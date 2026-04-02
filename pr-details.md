Title: ⚡ Bolt: Optimize 3D Background Mathematical Constants

💡 What: Optimized the high-frequency rendering loop `updateAndProjectSphereParticles` in `ThreeDBackgroundHelpers.ts` by precalculating mathematical constants like `Math.PI` to avoid property lookups on the `Math` object on every loop iteration.
🎯 Why: Inside the 60fps frame loop which can handle over 500-1500 particles, repetitive global object property lookups like `Math.PI` add up and cost valuable CPU cycles. Caching them inside the function scope improves execution speed slightly but consistently.
📊 Impact: Expected performance improvement is a 1-5% increase in operation speed for the function, contributing to a smoother 60fps experience for complex 3D scenes.
🔬 Measurement: Verified with `pnpm vitest bench components/ThreeDBackgroundHelpers.bench.ts`, the optimized version is ~1.02x to 1.04x faster than the current implementation. Full tests run successfully.
