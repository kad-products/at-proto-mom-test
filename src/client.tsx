import { initClient, initClientNavigation } from 'rwsdk/client';

// RedwoodSDK uses RSC RPC to emulate client side navigation.
// https://docs.rwsdk.com/guides/frontend/client-side-nav/
const { handleResponse, onHydrated } = initClientNavigation({
	onNavigate(): void {
		const section = window.location.pathname.split('/')[1];
		document.body.classList.forEach(c => {
			if (c.startsWith('site-section-')) document.body.classList.remove(c);
		});
		document.body.classList.add(`site-section-${section}`);
	},
});
initClient({ handleResponse, onHydrated });
