import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';
import { menuPositions, useCartStore } from '$/widgets/Menu';

const FormSchema = z.object({
	tableNumber: z.string().min(1, 'Нужно заполнить поле'),
	commentary: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export const Information = () => {
	const { tg } = useTg();
	const cart = useCartStore(state => state.cart);
	const price = useCartStore(state => state.price);
	const { handleSubmit, getValues, register, watch } = useForm<FormType>({
		resolver: zodResolver(FormSchema),
	});

	const { tableNumber, commentary } = watch();

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Продолжить',
		});
		tg.MainButton.onClick(async () => {
			handleSubmit(() => {})();
			if (tableNumber === '') return;

			const dishes = Object.entries(cart).map(
				([key, value]) =>
					`${menuPositions.find(pos => pos.id === key)?.title} - x${Number(value)} ${+(menuPositions.find(pos => pos.id === key)?.price || 0) * value} ₽`,
			);
			const message = `Заказ:\nНомер стола: ${tableNumber}\nКомментарий: ${commentary}\nБлюда:\n${dishes.join(
				'\n',
			)} \nИтого: ${price} ₽`;
			tg.sendData(message);
			tg.close();
		});
	}, [cart, getValues, handleSubmit, price, tg, tableNumber, commentary]);

	return (
		<form className="flex flex-col gap-2">
			<Input
				label="Номер стола"
				labelAsPlaceholder
				type="number"
				register={register('tableNumber')}
				required
			/>
			<Input
				label="Ваш комментарий: например, приборы на 3х человек"
				labelAsPlaceholder
				register={register('commentary')}
				required
			/>
		</form>
	);
};
