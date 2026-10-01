import Markdown from 'react-markdown';
import { DefaultLayout } from '@/layouts';
import { content } from '../../content/one-moms-journey';

export default async function Pages__one_moms_journey(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout>
			{content.map(section => {
				return (
					<div key={section.label} className="section">
						<h3>{section.label}</h3>
						<Markdown>{section.content}</Markdown>
					</div>
				);
			})}
		</DefaultLayout>
	);
}
