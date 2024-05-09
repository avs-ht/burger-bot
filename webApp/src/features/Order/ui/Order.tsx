import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useTg } from '$/shared/lib/useTg';
import { TitleBlock } from '$/shared/ui/kit/TitleBlock';
import { Information } from './blocks/Information';
import { Summary } from './blocks/Summary';
import { WayGettingOrder } from './blocks/WayGettingOrder';

export const Order = () => {
	const { tg } = useTg();
	const navigate = useNavigate();
	useEffect(() => {
		tg.BackButton.show();
		tg.BackButton.onClick(() => {
			navigate({ to: '/cart' });
			tg.MainButton.hide();
			tg.BackButton.hide();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="flex flex-col gap-4">
			<TitleBlock title="Способ получения заказа">
				<WayGettingOrder />
			</TitleBlock>
			<TitleBlock title="Информация">
				<Information />
			</TitleBlock>
			<TitleBlock title="Сводка">
				<Summary />
			</TitleBlock>
			<p className="text-xs">
				Нажимая на кнопку “Продолжить” вы даете согласие на обработку и хранение
				персональных данных в соответствии с Политикой конфиденциальности и
				условиями.{' '}
				<Link to={'/policy'} className="!text-[#40a7e4]">
					Подробнее
				</Link>
			</p>
		</div>
	);
};
