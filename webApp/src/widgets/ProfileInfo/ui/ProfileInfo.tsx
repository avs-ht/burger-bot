import clsx from 'clsx';

import { useTg } from '$/shared/lib/useTg';
import styles from './ProfileInfo.module.scss';

export const ProfileInfo = () => {
	const { user } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username,
		ID: user?.id,
		'Приглашено друзей': 1,
	};

	return (
		<div
			className={clsx(
				'w-full overflow-hidden rounded-lg p-2 py-1 shadow-[0_0_15px_0_rgba(0,0,0,0.75)]',
				styles.profileInfo,
			)}
		>
			{Object.entries(userInfo).map(([key, value], index) => (
				<>
					{value || value === 0 || !value ? (
						<div
							key={index}
							className="relative flex justify-between px-1 py-3 after:absolute after:bottom-0 after:left-[-100px] after:block after:h-[1px] after:min-w-[1000vw] after:bg-[#E7E7E7] after:content-[''] last:after:hidden"
						>
							<span>{key}</span>
							<span className="font-bold text-[#40a7e4]">{value}</span>
						</div>
					) : (
						''
					)}
				</>
			))}
		</div>
	);
};
