import type { RequestInfo } from 'rwsdk/worker';
import { DefaultLayout } from '@/layouts';
import { entries } from '@/lib/topics';

export default async function Pages__topics__entry({ request }: RequestInfo): Promise<React.JSX.Element> {
	const url = new URL(request.url);
	const slug = url.pathname.split('/')[2];
	const thisEntry = entries.find(entry => entry.slug === slug);
	if (!thisEntry) {
		return (
			<DefaultLayout>
				<h2>Entry not found</h2>
				<p>We could not find an entry for the slug: {slug}</p>
			</DefaultLayout>
		);
	}
	return (
		<DefaultLayout>
			<h2>{thisEntry.title}</h2>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content from markdown requires this */}
			<div dangerouslySetInnerHTML={{ __html: thisEntry.content }} />
		</DefaultLayout>
	);
}
