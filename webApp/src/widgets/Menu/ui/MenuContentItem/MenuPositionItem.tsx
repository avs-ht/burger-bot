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

	return (
		<div className={clsx('rounded-3xl rounded-t-[100px]', styles.item)}>
			<img
				className="aspect-video w-full rounded-t-3xl"
				src={menuPosition.image}
				alt={menuPosition.description}
			/>
			<div className="p-3">
				<h4 className="mb-3 line-clamp-1 text-sm font-bold">
					{menuPosition.title}
				</h4>
				{menuPosition.description && (
					<p className="text-menu mb-3 line-clamp-2 max-h-[32px] min-h-[32px] text-xs">
						{menuPosition.description}
					</p>
				)}
				{!cart[menuPosition.id] ? (
					<button
						className="w-full rounded-xl bg-app-green py-3 text-xs text-white"
						onClick={() => addToCart(menuPosition.id)}
					>{`${(+menuPosition.price).toFixed(0)} ₽`}</button>
				) : (
					<div className="flex items-center justify-between gap-5">
						<button
							className="flex aspect-square w-[40px] items-center justify-center rounded-xl bg-app-green text-xl leading-[1] text-white"
							onClick={() => deleteFromCart(menuPosition.id)}
						>
							-
						</button>
						<div className="flex h-[40px] flex-grow items-center justify-center rounded-xl bg-white text-black">
							{cart[menuPosition.id]}
						</div>
						<button
							className="flex aspect-square w-[40px] items-center justify-center rounded-xl bg-app-green leading-[1] text-white"
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
