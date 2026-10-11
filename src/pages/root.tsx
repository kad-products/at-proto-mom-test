import Markdown from 'react-markdown';
import { DefaultLayout } from '@/layouts';
import { content } from '../../content/our-goal';

export default async function Pages__root(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout activeNav="root">
			<Markdown>{content}</Markdown>
		</DefaultLayout>
	);
}
