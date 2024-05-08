import { useTg } from '$/shared/lib/useTg';

export const ProfileInfo = () => {
	const { user, tg } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username,
		ID: user?.id,
		'Приглашено друзей': 1,
	};

	return (
		<div className="w-full rounded-lg p-2 shadow-[0_0_15px_0_rgba(0,0,0,0.75)]">
			{Object.entries(userInfo).map(([key, value], index) => (
				<>
					{value || value === 0 || !value ? (
						<div
							key={index}
							className="flex justify-between border-b-[1px] border-b-black px-1 py-3 last:border-b-[0px]"
						>
							<span>{key}</span>
							<span className="font-bold">{value}</span>
						</div>
					) : (
						''
					)}
				</>
			))}
			{tg.themeParams.bg_color}
		</div>
	);
};
