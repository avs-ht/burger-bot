import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';

const FormSchema = z.object({
	visitTime: z
		.string({ required_error: 'Это поле обязательное' })
		.min(1, 'Нужно заполнить поле'),
	visitDate: z
		.string({ required_error: 'Это поле обязательное' })
		.min(1, 'Нужно заполнить поле'),
	phone: z
		.string({ required_error: 'Это поле обязательное' })
		.min(11, 'Нужно заполнить поле'),
	tableNumber: z
		.string({ required_error: 'Это поле обязательное' })
		.min(1, 'Нужно заполнить поле'),
	name: z
		.string({ required_error: 'Это поле обязательное' })
		.min(1, 'Нужно заполнить поле'),
});

type FormType = z.infer<typeof FormSchema>;

export const BookTable = () => {
	const { tg } = useTg();
	tg.MainButton.setParams({
		text: 'Забронировать стол',
	});
	tg.MainButton.show();

	const {
		register,
		clearErrors: clearError,
		formState: { errors },
		setError,
		trigger,
	} = useForm<FormType>({
		resolver: zodResolver(FormSchema),
	});

	tg.MainButton.onClick(async () => {
		await trigger();
		if (errors) return;
		else tg.sendData(JSON.stringify({ errors }));
	});

	return (
		<form className="flex flex-col gap-3 pb-7">
			<Input
				label="Время визита"
				register={register('visitTime')}
				clearError={() => clearError('visitTime')}
				errorText={errors.visitTime?.message}
				type="time"
			/>
			<Input
				label="День визита"
				register={register('visitDate')}
				clearError={() => clearError('visitDate')}
				onChange={e => {
					if (new Date().getTime() >= new Date(e.target.value).getTime()) {
						setError('visitDate', {
							message: 'Дата не может быть раньше текущей!',
						});
					}
				}}
				errorText={errors.visitDate?.message}
				type="date"
			/>
			<div className="mb-6 mt-4 flex flex-col items-center gap-1">
				<h2 className="text-center text-xl font-bold">
					Схема зала и расстановка столов
				</h2>
				<img
					className="w-full max-w-[420px]"
					src="/imagePlaceholder.jpg"
					alt="Схема зала и расстановка столов"
				/>
			</div>
			<Input
				label="Номер стола"
				register={register('tableNumber')}
				clearError={() => clearError('tableNumber')}
				errorText={errors.tableNumber?.message}
			/>
			<Input
				label="Номер телефона"
				register={register('phone')}
				clearError={() => clearError('phone')}
				errorText={errors.phone?.message}
			/>
			<Input
				label="Имя"
				register={register('name')}
				clearError={() => clearError('name')}
				errorText={errors.name?.message}
			/>
		</form>
	);
};
