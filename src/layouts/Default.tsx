import { StrictMode } from 'react';

export function DefaultLayout({ activeNav, children }: { activeNav: string; children: React.ReactNode }): React.ReactNode {
	return (
		<StrictMode>
			<header className="default-header">
				<h1 className="welcome-title">@ Proto Takes The Mom Test</h1>
				<nav className="main-nav">
					<a href="/" className={activeNav === 'root' ? 'main-nav-active' : ''}>
						Our Goal
					</a>
					<a href="/the-test" className={activeNav === 'the-test' ? 'main-nav-active' : ''}>
						The Test
					</a>
					<a href="/journey" className={activeNav === 'journey' ? 'main-nav-active' : ''}>
						One Mom's Journey
					</a>
					<a href="/topics" className={activeNav === 'topics' ? 'main-nav-active' : ''}>
						Explore the Protocol
					</a>
					<a href="/about-us" className={activeNav === 'about-us' ? 'main-nav-active' : ''}>
						About Us
					</a>
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
