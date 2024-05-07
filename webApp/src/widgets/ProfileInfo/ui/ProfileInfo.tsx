import { useTg } from '$/shared/lib/useTg';

export const ProfileInfo = () => {
	const { user } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username,
		ID: user?.id,
		'Приглашено друзей': 0,
	};

	return (
		<div className="rounded-sm">
			{Object.entries(userInfo).map(([key, value]) => (
				<>
					{value && (
						<div key={key} className="flex justify-between">
							<span>{key}</span>
							<span>{value}</span>
						</div>
					)}
				</>
			))}
		</div>
	);
};
