import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useTg } from '$/shared/lib/useTg';

export const PolicyPage = () => {
	const { tg } = useTg();
	const navigate = useNavigate();
	useEffect(() => {
		tg.BackButton.onClick(() => {
			navigate({ to: '/order' });
			tg.MainButton.show();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div>PolicyPage</div>;
};
