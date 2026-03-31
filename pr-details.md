Title: 🧹 [Code Health] Extract inline logic in BlogPage.tsx

🎯 **What:** The `BlogPage.tsx` component had a deeply nested ternary operator (`isLoading ? ... : filteredPosts.length > 0 ? ... : ...`) and complex inline functions (like the `onReadMore` handler). These have been extracted out into well-named component methods `renderContent()` and `handleReadMore(post: BlogPost)`.

💡 **Why:** Deeply nested JSX conditionals and inline closures make components hard to read, maintain, and prone to formatting errors. Extracting the rendering logic into early-return conditionals inside a helper method flattens the code and drastically improves cognitive load without modifying component behavior.

✅ **Verification:** I ran `pnpm test pages/BlogPage` to ensure existing behavior and tests pass. I also ran `pnpm lint` and `pnpm build` to confirm no new type regressions or build errors were introduced.

✨ **Result:** A much cleaner, more maintainable, and readable `BlogPage` component structure.
