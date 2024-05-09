import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useTg } from '$/shared/lib/useTg';

export const EmptyCart = () => {
	const { tg } = useTg();
	const navigate = useNavigate();
	useEffect(() => {
		tg.MainButton.show();
		tg.MainButton.setText('Вернуться обратно');
		tg.MainButton.onClick(() => navigate({ to: '/' }));
	}, [navigate, tg.MainButton]);
	return (
		<div className="flex flex-col items-center gap-5 pt-8">
			<svg
				className="text-menu w-full max-w-[100px]"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
				<path d="M3 6h18" />
				<path d="M16 10a4 4 0 0 1-8 0" />
			</svg>
			<h1 className="text-menu">Ваша корзина пуста</h1>
		</div>
	);
};
