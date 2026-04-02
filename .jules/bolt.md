## 2024-04-02 - React Statically Defined Arrays
**Learning:** Re-defining static arrays (like mock data or config lists) inside React components is a common anti-pattern that leads to unnecessary object recreation on every single render. This forces garbage collection and breaks shallow equality checks in child components.
**Action:** Always extract static configurations or mock data arrays outside the component body unless they depend dynamically on props or hooks (in which case, wrap them in `React.useMemo()`).
