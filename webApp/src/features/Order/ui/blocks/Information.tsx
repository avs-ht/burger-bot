import { useCallback, useEffect, useState } from 'react';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';
import { menuPositions, useCartStore } from '$/widgets/Menu';

export const Information = () => {
	const { tg } = useTg();
	const cart = useCartStore(state => state.cart);
	const price = useCartStore(state => state.price);
	const [tableNumber, setTableNumber] = useState('');
	const [commentary, setCommentary] = useState('');

	const sendData = useCallback(() => {
		const dishes = Object.entries(cart).map(
			([key, value]) =>
				`${menuPositions.find(pos => pos.id === key)?.title} - x${Number(value)} ${+(menuPositions.find(pos => pos.id === key)?.price || 0) * value} ₽`,
		);
		const message = `Заказ:\nНомер стола: ${tableNumber}\nКомментарий: ${commentary}\nБлюда:\n${dishes.join(
			'\n',
		)} \nИтого: ${price} ₽`;
		tg.sendData(message);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableNumber, commentary]);
	useEffect(() => {
		if (tableNumber) {
			tg.MainButton.show();
		} else {
			tg.MainButton.hide();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableNumber]);
	useEffect(() => {
		tg.onEvent('mainButtonClicked', sendData);
		return () => {
			tg.offEvent('mainButtonClicked', sendData);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendData]);
	tg.MainButton.setParams({
		text: 'Продолжить',
	});

	return (
		<form className="flex flex-col gap-2">
			<Input
				label="Номер стола"
				labelAsPlaceholder
				type="number"
				onChange={e => setTableNumber(e.target.value)}
			/>
			<Input
				label="Ваш комментарий: например, приборы на 3х человек"
				labelAsPlaceholder
				onChange={e => setCommentary(e.target.value)}
			/>
		</form>
	);
};
