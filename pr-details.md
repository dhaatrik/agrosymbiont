# ⚡ Bolt: Extract static teamMembers array to prevent recreation on every render

## 💡 What:
Extracted the static `teamMembers` array outside of the `TeamCarousel` functional component in `components/TeamCarousel.tsx`. Added an explanatory comment above the array detailing the optimization.

## 🎯 Why:
Because the array was defined inside the component body, React was allocating a new array and new member objects on every single render cycle. By hoisting it outside the component, it becomes a single, static reference, eliminating unnecessary garbage collection overhead and minor memory churn during re-renders.

## 📊 Impact:
Small but measurable reduction in memory allocation and garbage collection overhead during re-renders of the `TeamCarousel` component. This preserves reference equality for the data array.

## 🔬 Measurement:
The optimization can be verified by observing the `TeamCarousel` component in React DevTools. The array will no longer appear as a new object instance on subsequent renders. Verified safe by ensuring the full test suite passes.
