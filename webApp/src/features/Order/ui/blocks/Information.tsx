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
	const {
		handleSubmit,
		getValues,
		clearErrors,
		formState: { errors },
		register,
	} = useForm<FormType>({
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Продолжить',
		});
		tg.MainButton.onClick(async () => {
			handleSubmit(() => {})();
			if (!Object.values(errors).filter(Boolean).length) return;

			const values = getValues();
			const dishes = Object.entries(cart).map(
				([key, value]) =>
					`${menuPositions.find(pos => pos.id === key)?.title} - x${Number(value)} ${+(menuPositions.find(pos => pos.id === key)?.price || 0) * value} ₽`,
			);
			const message = `Заказ:\nНомер стола: ${values.tableNumber}\nКомментарий: ${values.commentary}\nБлюда:\n${dishes.join(
				'\n',
			)} \nИтого: ${price} ₽`;
			tg.sendData(message);
			tg.close();
		});
	}, [cart, errors, getValues, handleSubmit, price, tg]);

	return (
		<form className="flex flex-col gap-2">
			<Input
				label="Номер стола"
				labelAsPlaceholder
				type="number"
				register={register('tableNumber')}
				clearError={() => clearErrors('tableNumber')}
				errorText={errors.tableNumber?.message}
			/>
			<Input
				label="Ваш комментарий: например, приборы на 3х человек"
				labelAsPlaceholder
				register={register('commentary')}
				clearError={() => clearErrors('commentary')}
				errorText={errors.commentary?.message}
			/>
		</form>
	);
};
