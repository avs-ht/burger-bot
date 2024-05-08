import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';

const FormSchema = z.object({
	visitTime: z.string().datetime(),
	visitDate: z.date(),
	phone: z.string(),
	tableNumber: z.number(),
	name: z.string(),
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
		trigger,
	} = useForm<FormType>();

	tg.MainButton.onClick(() => {
		trigger();
		if (errors) return;
		else tg.sendData(JSON.stringify({ errors }));
	});
	return (
		<div className="flex flex-col gap-3">
			<span className="text-red">{tg.platform}</span>
			<Input
				label="Время визита"
				register={register('visitTime')}
				clearError={() => clearError('visitTime')}
				errorText={errors.visitTime?.message}
			/>
			<Input
				label="День визита"
				register={register('visitDate')}
				clearError={() => clearError('visitDate')}
				errorText={errors.visitDate?.message}
			/>
			<div className="mt-4 flex flex-col items-center gap-3">
				<h2 className="text-white">Схема зала и расстановка столов</h2>
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
				label="Имя клиента"
				register={register('name')}
				clearError={() => clearError('name')}
				errorText={errors.name?.message}
			/>
		</div>
	);
};
