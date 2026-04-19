## 2026-04-19 - Remove Artificial Delay in ServicesPage Loading State
**Learning:** Skeletons designed to mimic network delays on purely client-side static pages artificially bloat the First Meaningful Paint. Removing `setTimeout` driven `isLoading` states directly translates into a massive perceived performance gain (from ~1.5s to ~75ms render time).
**Action:** When auditing page load times, immediately identify if components use empty timeouts masquerading as data fetching delays and strip them out if no actual network I/O is occurring.
