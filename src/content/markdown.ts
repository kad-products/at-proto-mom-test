import type React from 'react';

// ---------------------------------------------------------------------------
// MDX module shapes
// These describe what @mdx-js/rollup + remark-mdx-frontmatter emit per file.
// Each directory gets its own interface so the frontmatter is properly typed.
// ---------------------------------------------------------------------------

interface JourneyMdxModule {
	default: React.ComponentType;
	frontmatter: {
		title: string;
		order: number;
		navLabel?: string;
	};
}

interface TopicMdxModule {
	default: React.ComponentType;
	frontmatter: {
		title: string;
		order: number;
		navLabel?: string;
		short?: string;
	};
}

interface HomeSectionMdxModule {
	default: React.ComponentType;
	// Not all files in content/home/ have frontmatter (e.g. intro.md has none).
	frontmatter: {
		title: string;
		order: number;
	};
}

interface HomeMdxModule {
	default: React.ComponentType;
	// content/home.md has no frontmatter
}

// ---------------------------------------------------------------------------
// Exported entry types
// ---------------------------------------------------------------------------

export type JourneyEntry = {
	slug: string;
	title: string;
	order: number;
	navLabel?: string;
	Content: React.ComponentType;
};

export type TopicEntry = {
	slug: string;
	title: string;
	order: number;
	navLabel?: string;
	short?: string;
	Content: React.ComponentType;
};

export type HomeSectionEntry = {
	slug: string;
	title: string;
	order: number;
	Content: React.ComponentType;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugFromPath(path: string): string {
	const filename = path.split('/').at(-1) ?? path;
	return filename.replace(/\.mdx?$/, '');
}

// ---------------------------------------------------------------------------
// Journey  (content/journey/*.md)
// ---------------------------------------------------------------------------

const journeyModules = import.meta.glob<JourneyMdxModule>('../../content/journey/*.md', { eager: true });

export const journey: JourneyEntry[] = Object.entries(journeyModules)
	.map(([path, mod]) => ({
		slug: slugFromPath(path),
		Content: mod.default,
		...mod.frontmatter,
	}))
	.sort((a, b) => a.order - b.order);

// ---------------------------------------------------------------------------
// Topics  (content/topics/*.md)
// ---------------------------------------------------------------------------

const topicsModules = import.meta.glob<TopicMdxModule>('../../content/topics/*.md', { eager: true });

export const topics: TopicEntry[] = Object.entries(topicsModules)
	.map(([path, mod]) => ({
		slug: slugFromPath(path),
		Content: mod.default,
		...mod.frontmatter,
	}))
	.sort((a, b) => a.order - b.order);

// ---------------------------------------------------------------------------
// Home sections  (content/home/*.md)
// ---------------------------------------------------------------------------

const homeSectionModules = import.meta.glob<HomeSectionMdxModule>('../../content/home/*.md', { eager: true });

export const homeSections: HomeSectionEntry[] = Object.entries(homeSectionModules)
	.map(([path, mod]) => ({
		slug: slugFromPath(path),
		Content: mod.default,
		...mod.frontmatter,
	}))
	.sort((a, b) => a.order - b.order);

// ---------------------------------------------------------------------------
// Home page  (content/home*.md — just the markdown, no frontmatter)
// ---------------------------------------------------------------------------

const homeIntroModules = import.meta.glob<HomeMdxModule>('../../content/home-intro.md', { eager: true });
// biome-ignore lint/style/noNonNullAssertion: content/home.md is always present in the bundle
export const HomeIntro: React.ComponentType = Object.values(homeIntroModules)[0]!.default;

const homeOutroModules = import.meta.glob<HomeMdxModule>('../../content/home-outro.md', { eager: true });
// biome-ignore lint/style/noNonNullAssertion: content/home.md is always present in the bundle
export const HomeOutro: React.ComponentType = Object.values(homeOutroModules)[0]!.default;
