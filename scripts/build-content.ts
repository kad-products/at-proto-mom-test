/**
 * Converts markdown files in content/{type}/ into TypeScript modules in src/lib/{type}/.
 * Also writes a barrel file at src/lib/{type}.ts that exports a sorted `entries` array.
 *
 * Usage:
 *   tsx scripts/build-content.ts              # build all known content types
 *   tsx scripts/build-content.ts journey      # build only journey
 *   tsx scripts/build-content.ts --watch      # build + watch for changes
 */

import { existsSync, watch } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Add new content types here as the site grows.
const KNOWN_TYPES = ['journey', 'topics'];

function paths(type: string) {
	return {
		contentDir: join(ROOT, 'content', type),
		libDir: join(ROOT, 'src', 'lib', type),
		barrelPath: join(ROOT, 'src', 'lib', `${type}.ts`),
	};
}

async function processMarkdownFile(mdPath: string, libDir: string): Promise<string> {
	const raw = await readFile(mdPath, 'utf-8');
	const { data, content: body } = matter(raw);

	const html = await marked(body.trim());
	const slug = basename(mdPath, extname(mdPath));

	// slug and content are computed — drop them if accidentally present in frontmatter
	const { slug: _s, content: _c, ...frontmatter } = data as Record<string, unknown>;

	const fields = [
		`  slug: ${JSON.stringify(slug)}`,
		...Object.entries(frontmatter).map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`),
		`  content: ${JSON.stringify(html)}`,
	];

	const ts = `// Generated from ${basename(mdPath)} — do not edit directly
export const entry = {
${fields.join(',\n')},
};
`;

	await writeFile(join(libDir, `${slug}.ts`), ts);
	return slug;
}

async function buildContentType(type: string): Promise<void> {
	const { contentDir, libDir, barrelPath } = paths(type);

	if (!existsSync(contentDir)) {
		console.log(`[${type}] content dir not found, skipping`);
		return;
	}

	await mkdir(libDir, { recursive: true });

	const files = (await readdir(contentDir)).filter(f => f.endsWith('.md')).sort();

	const slugs: string[] = [];
	for (const file of files) {
		const slug = await processMarkdownFile(join(contentDir, file), libDir);
		slugs.push(slug);
		console.log(`[${type}] ${file} → src/lib/${type}/${slug}.ts`);
	}

	const imports = slugs.map((slug, i) => `import { entry as e${i} } from './${type}/${slug}';`).join('\n');
	const list = slugs.map((_, i) => `  e${i}`).join(',\n');

	const barrel = `// Generated from content/${type}/ — do not edit directly
${imports}

export const entries = [
${list},
].sort((a, b) => a.order - b.order);
`;

	await writeFile(barrelPath, barrel);
	console.log(`[${type}] wrote src/lib/${type}.ts`);
}

function startWatcher(types: string[]): void {
	for (const type of types) {
		const { contentDir } = paths(type);
		if (!existsSync(contentDir)) continue;

		watch(contentDir, { recursive: true }, async (_event, filename) => {
			if (!filename?.endsWith('.md')) return;
			console.log(`\n[${type}] change in ${filename}, rebuilding...`);
			try {
				await buildContentType(type);
			} catch (err) {
				console.error(`[${type}] build error:`, err);
			}
		});

		console.log(`[${type}] watching ${contentDir}`);
	}
}

const args = process.argv.slice(2);
const watchMode = args.includes('--watch');
const requestedTypes = args.filter(a => !a.startsWith('--'));
const types = requestedTypes.length > 0 ? requestedTypes : KNOWN_TYPES.filter(t => existsSync(join(ROOT, 'content', t)));

for (const type of types) {
	await buildContentType(type);
}

if (watchMode) {
	startWatcher(types);
} else {
	process.exit(0);
}
