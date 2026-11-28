import { DSCard } from '@/components/design-system';
import { HomeIntro, HomeOutro, homeSections } from '@/content/markdown';
import { DefaultLayout } from '@/layouts';

export default async function Pages__root(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout activeNav="root">
			<HomeIntro />
			<div className="analogy-options">
				{homeSections.map(sect => {
					return (
						<DSCard key={sect.slug} title={sect.title}>
							<sect.Content />
						</DSCard>
					);
				})}
			</div>
			<HomeOutro />
		</DefaultLayout>
	);
}
