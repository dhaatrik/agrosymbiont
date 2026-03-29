# 2024-05-24

CRITICAL LEARNING: Adding `loading="lazy"` to markdown images improves First Contentful Paint (FCP) and Time to Interactive (TTI) metrics by deferring offscreen image loading. Ensure the attribute is explicitly added to customized markdown components (e.g. react-markdown's `img` renderer) so it properly inherits standard web optimizations.
