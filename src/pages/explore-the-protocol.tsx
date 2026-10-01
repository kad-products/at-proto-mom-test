import Markdown from 'react-markdown';
import { DefaultLayout } from '@/layouts';
import { concepts } from '../../content/explore-the-protocol';

export default async function Pages__explore_the_protocol(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout>
			{concepts.map(concept => (
				<div key={concept.label} className="concept">
					<h3>{concept.label}</h3>
					<Markdown>{concept.content}</Markdown>
				</div>
			))}
		</DefaultLayout>
	);
}
