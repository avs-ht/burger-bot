import { useCallback, useEffect, useState } from 'react';

import { useTg } from '$/shared/lib/useTg';
import Input from '$/shared/ui/kit/Input';

export const BookTable = () => {
	const { tg } = useTg();
	const [time, setTime] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [tableNumber, setTableNumber] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');

	const sendData = useCallback(() => {
		tg.sendData(
			`Забронирован столик: ${tableNumber}\nВремя: ${time}\nДата: ${date}\nИмя: ${name}\nТелефон: ${phone}`,
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date, name, phone, tableNumber, time]);

	tg.MainButton.setParams({
		text: 'Забронировать стол',
	});

	useEffect(() => {
		if (date && name && phone && tableNumber && time) {
			tg.MainButton.show();
		} else {
			tg.MainButton.hide();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date, name, phone, tableNumber, time]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', sendData);
		return () => {
			tg.offEvent('mainButtonClicked', sendData);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendData]);

	return (
		<form className="flex flex-col gap-3 pb-7">
			<Input
				label="Время визита"
				type="time"
				value={time}
				onChange={e => setTime(e.target.value)}
			/>
			<Input
				label="День визита"
				type="date"
				value={date}
				onChange={e => setDate(e.target.value)}
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
				value={tableNumber}
				onChange={e => setTableNumber(e.target.value)}
			/>
			<Input
				label="Номер телефона"
				value={phone}
				onChange={e => setPhone(e.target.value)}
			/>
			<Input label="Имя" value={name} onChange={e => setName(e.target.value)} />
		</form>
	);
};
