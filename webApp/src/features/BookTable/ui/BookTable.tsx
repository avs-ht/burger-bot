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
	tg.MainButton.text = 'Забронировать стол';

	const {
		register,
		clearErrors: clearError,
		formState: { errors },
	} = useForm<FormType>();
	return (
		<div className="">
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
			<div className="mb-3 mt-7 flex flex-col items-center gap-3">
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
