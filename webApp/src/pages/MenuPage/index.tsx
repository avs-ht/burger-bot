import { useTg } from '$/shared/lib/useTg';

export const MenuPage = () => {
	const { closeApp } = useTg();
	return <button onClick={closeApp}>закрыть</button>;
};
