⚡ Bolt: Prevent unnecessary teamMembers array recreation in TeamCarousel

💡 **What:** Extracted the statically defined `teamMembers` array outside of the `TeamCarousel` component body.
🎯 **Why:** Defining an array inside a functional component causes the array to be re-allocated in memory on every single render. Since `TeamCarousel` frequently updates state based on touch inputs (swiping), this resulted in unnecessary continuous garbage collection and broken shallow equality references.
📊 **Impact:** Reduces object creation overhead to zero for this array during the component's lifecycle, resulting in marginally smoother swipe events by easing GC pressure.
🔬 **Measurement:** This optimization can be conceptually verified. Run tests (`pnpm test`) to guarantee no functional regressions were introduced.
