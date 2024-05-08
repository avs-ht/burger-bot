import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from '@tanstack/react-router';
import convert from 'color-convert';
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
		const [h, s, l] = convert.hex.hsl(tg.themeParams.bg_color || '');
		document.body.style.setProperty('--tg-theme-bg-color-h', `${h}`);
		document.body.style.setProperty('--tg-theme-bg-color-s', `${s}`);
		document.body.style.setProperty('--tg-theme-bg-color-l', `${l}`);
		console.log(h, s, l);
	});

	return <RouterProvider router={router} />;
};
