import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { useEffect } from 'react';

import { useCartStore } from '../../model/CartStore';
import { MenuPosition as MenuPositionType } from '../../model/MenuPosition';

import { useTg } from '$/shared/lib/useTg';
import styles from './MenuPositionItem.module.scss';

export const MenuPositionItem = ({
	menuPosition,
}: {
	menuPosition: MenuPositionType;
}) => {
	const { addToCart, deleteFromCart, price, cart } = useCartStore();
	const { tg } = useTg();
	const navigate = useNavigate();

	useEffect(() => {
		if (!price) {
			tg.MainButton.hide();
			return;
		}

		tg.MainButton.setParams({
			text: `Корзина ${price.toFixed(2)} ₽`,
		});
		tg.MainButton.show();
	}, [price, tg.MainButton]);

	useEffect(() => {
		tg.MainButton.onClick(() => navigate({ to: '/cart' }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div
			className={clsx('rounded-3xl rounded-t-[100px]', styles.item, {
				[styles.active]: menuPosition.id in cart && cart[menuPosition.id] > 0,
			})}
		>
			<img
				className="aspect-video w-full rounded-t-3xl object-cover"
				src={menuPosition.image}
				alt={menuPosition.description}
			/>
			<div className="p-3">
				<h4 className="mb-3 line-clamp-1 text-sm font-bold capitalize">
					{menuPosition.title}
				</h4>
				{menuPosition.description && (
					<p className="mb-3 line-clamp-2 max-h-[32px] min-h-[32px] text-xs text-menu">
						{menuPosition.description}
					</p>
				)}
				{!cart[menuPosition.id] ? (
					<button
						className="w-full rounded-xl py-3 text-xs text-white"
						onClick={() => addToCart(menuPosition.id)}
					>{`${(+menuPosition.price).toFixed(0)} ₽`}</button>
				) : (
					<div className="flex max-h-[40px] items-center justify-between gap-2">
						<button
							className="flex aspect-square h-full w-full max-w-[30px] items-center justify-center rounded-xl text-xl leading-[1]"
							onClick={() => deleteFromCart(menuPosition.id)}
						>
							-
						</button>
						<div className="flex min-h-[30px] flex-grow items-center justify-center rounded-xl bg-white text-black">
							{cart[menuPosition.id]}
						</div>
						<button
							className="flex aspect-square h-full w-full max-w-[30px] items-center justify-center rounded-xl leading-[1]"
							onClick={() => addToCart(menuPosition.id)}
						>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
