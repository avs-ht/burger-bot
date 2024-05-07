const tg = window.Telegram.WebApp;
export const useTg = () => {
	const closeApp = () => {
		tg.close();
	};
	const toggleButton = () => {
		tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
	};
	const user = tg.initDataUnsafe?.user;

	return {
		tg,
		user,
		closeApp,
		toggleButton,
	};
};
