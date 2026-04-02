# ⚡ Bolt: Extract static array to improve render performance

## Description

* **💡 What:** Extracted the static `teamMembers` array outside of the `TeamCarousel` component body.
* **🎯 Why:** To prevent recreating the array and its object references on every render cycle, which causes unnecessary memory allocation and garbage collection pressure during high-frequency events like touch/swipe interactions.
* **📊 Impact:** Reduces unnecessary array recreations on every render for `TeamCarousel`, making animations slightly smoother and memory usage more stable.
* **🔬 Measurement:** Observe memory usage and render times in React DevTools during rapid swiping.
