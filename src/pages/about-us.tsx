import { DefaultLayout } from '@/layouts';
import { peeps } from '../../content/about-us';

export default async function Pages__about_us(): Promise<React.JSX.Element> {
	return (
		<DefaultLayout>
			{peeps.map(peep => {
				return (
					<div key={peep.name} className="peep">
						<h3>{peep.name}</h3>
						<p>{peep.note}</p>
					</div>
				);
			})}
		</DefaultLayout>
	);
}
