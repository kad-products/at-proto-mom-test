// Type declarations for .md files processed by @mdx-js/rollup + remark-mdx-frontmatter.
// The generic `frontmatter` shape here is intentionally loose — src/content/markdown.ts
// uses import.meta.glob<SpecificType>() to get per-directory typed frontmatter.
declare module '*.md' {
	import type React from 'react';

	const MDXContent: React.ComponentType;
	export const frontmatter: Record<string, unknown>;
	export default MDXContent;
}
