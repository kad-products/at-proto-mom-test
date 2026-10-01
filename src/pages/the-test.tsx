import Markdown from 'react-markdown';
import { DefaultLayout } from '@/layouts';
import { content } from '../../content/the-test';

export default async function Pages__the_test(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout>
			<Markdown>{content}</Markdown>
		</DefaultLayout>
	);
}
