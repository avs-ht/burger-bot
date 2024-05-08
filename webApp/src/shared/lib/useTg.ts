const tg = window.Telegram.WebApp;
export const useTg = () => {
	const closeApp = () => {
		tg.close();
	};

	const user = tg.initDataUnsafe?.user;

	return {
		tg,
		user,
		closeApp,
	};
};
