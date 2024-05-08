import { useTg } from '$/shared/lib/useTg';

export const ProfileInfo = () => {
	const { user } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username,
		ID: user?.id,
		'Приглашено друзей': 0,
	};

	return (
		<div className="w-full rounded-sm pt-1 shadow-lg">
			{Object.entries(userInfo).map(([key, value]) => (
				<>
					{value || value === 0 ? (
						<div key={key} className="flex justify-between px-1 py-3">
							<span>{key}</span>
							<span className="font-bold">{value}</span>
						</div>
					) : (
						''
					)}
				</>
			))}
		</div>
	);
};
