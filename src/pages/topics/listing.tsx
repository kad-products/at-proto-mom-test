import { KADCard } from '@kad-products/sofrito';
import { DefaultLayout } from '@/layouts';
import { entries } from '@/lib/topics';

export default async function Pages__topics__listing(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout>
			{entries.map(entry => (
				<KADCard
					key={entry.slug}
					title={entry.title}
					body={entry.short}
					actions={[
						{
							label: 'Read more',
							href: `/topics/${entry.slug}/`,
							requiredPermission: 'topics:read',
						},
					]}
					userPermissions={['topics:read']}
				/>
			))}
		</DefaultLayout>
	);
}
