import { StrictMode } from 'react';

export function DefaultLayout({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<StrictMode>
			<header className="default-header">
				<h1 className="welcome-title">@ Proto Takes The Mom Test</h1>
				<nav className="main-nav">
					<a href="/">Our Goal</a>
					<a href="/the-test">The Test</a>
					<a href="/journey">One Mom's Journey</a>
					<a href="/explore-the-protocol">Explore the Protocol</a>
					<a href="/about-us">About Us</a>
				</nav>
			</header>
			<main>{children}</main>
			<footer className="default-footer">
				<nav className="footer-nav">
					<a href="/bluesky">Bluesky</a>
					<a href="/github">GitHub</a>
				</nav>
			</footer>
		</StrictMode>
	);
}
