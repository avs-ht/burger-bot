import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';

const FormSchema = z.object({
	tableNumber: z.string().min(1, 'Нужно заполнить поле'),
	commentary: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export const Information = () => {
	const { tg } = useTg();
	const {
		trigger,
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
			await trigger();

			if (errors) return;
		});
	}, [errors, tg.MainButton, trigger]);

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
