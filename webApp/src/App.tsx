import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, history: createHashHistory() });
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const tg = window.Telegram.WebApp;
export const App = () => {
	useEffect(() => {
		tg.ready();
		tg.expand();

		if (tg.colorScheme === 'dark') {
			document.body.setAttribute('data-theme', 'dark');
		} else {
			document.body.setAttribute('data-theme', 'light');
		}
	}, []);

	return <RouterProvider router={router} />;
};
