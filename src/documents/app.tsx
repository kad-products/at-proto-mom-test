import type { DocumentProps } from 'rwsdk/router';
import type { RequestInfo } from 'rwsdk/worker';
import styles from '../styles/main.css?url';

const cfBeaconToken: string | undefined = import.meta.env.VITE_CF_BEACON_TOKEN;

const AppDocument: React.FC<DocumentProps<RequestInfo>> = ({ children, request }: DocumentProps<RequestInfo>) => {
	const siteSection = new URL(request.url).pathname.split('/')[1];
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>@ Proto Takes The Mom Test</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>
				<link rel="modulepreload" href="/src/client.tsx" />
				<link rel="stylesheet" href={styles} />
				{cfBeaconToken && (
					<script
						defer
						src="https://static.cloudflareinsights.com/beacon.min.js"
						data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
					/>
				)}
			</head>
			<body className={`site-section-${siteSection}`}>
				<div id="root">{children}</div>
				<script>import("/src/client.tsx")</script>
			</body>
		</html>
	);
};

export default AppDocument;
