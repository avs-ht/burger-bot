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
	});

	return <RouterProvider router={router} />;
};
