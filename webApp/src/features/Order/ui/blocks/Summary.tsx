import { useCartStore } from '$/widgets/Menu';

export const Summary = () => {
	const price = useCartStore(state => state.price);
	const params = {
		Сумма: price,
		Итого: price,
	};
	return (
		<ul className="pt-1">
			{Object.entries(params).map(([name, value]) => (
				<li
					className="flex justify-between gap-2 border-b-[1px] px-2 py-3 last:border-0"
					style={{
						borderBottomColor: 'var(--info-block-divider-color)',
					}}
				>
					<span>{name}</span>
					<span
						className="font-bold"
						style={{ color: 'var(--button-bg-color)' }}
					>
						{value} ₽
					</span>
				</li>
			))}
		</ul>
	);
};
