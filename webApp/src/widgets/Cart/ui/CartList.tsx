import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useTg } from '$/shared/lib/useTg';
import { menuPositions, useCartStore } from '$/widgets/Menu';
import styles from './CartList.module.scss';

export const CartList = () => {
	const { cart, deleteFromCart, addToCart } = useCartStore();
	const { tg } = useTg();
	const navigate = useNavigate();
	useEffect(() => {
		tg.MainButton.setText('Оформить заказ');
		tg.MainButton.show();
		tg.MainButton.onClick(() => navigate({ to: '/order' }));
	}, [tg.MainButton, navigate]);

	return (
		<ul className="flex flex-col gap-6 pt-5">
			{Object.entries(cart).map(([id, count]) => {
				const position = menuPositions.find(position => position.id === id);
				if (!position || count <= 0) return null;

				const { title, price, image } = position;
				const buttonClassName = `flex aspect-square h-full w-full max-w-[30px] items-center justify-center rounded-xl leading-[1] ${styles.button}`;
				return (
					<li key={id} className="flex justify-between gap-3">
						<div className="flex gap-1">
							<img
								src={image}
								alt=""
								className="max-h-[65px] max-w-[65px] object-cover"
							/>
							<div className="">
								<h2 className="mb-3 line-clamp-1">{title}</h2>
								<div className="">
									<div className="flex max-h-[40px] items-center gap-5">
										<button
											className={buttonClassName}
											onClick={() => deleteFromCart(id)}
										>
											-
										</button>
										<div className="flex min-h-[30px] items-center justify-center rounded-xl">
											{count}
										</div>
										<button
											className={buttonClassName}
											onClick={() => addToCart(id)}
										>
											+
										</button>
									</div>
								</div>
							</div>
						</div>
						<span className="whitespace-nowrap font-bold">
							{+price * count} ₽
						</span>
					</li>
				);
			})}
		</ul>
	);
};
