import clsx from 'clsx';

import styles from './index.module.scss';

export const InfoBlock = ({
	info,
}: {
	info: Record<string, string | number>;
}) => {
	return (
		<div
			className={clsx(
				'w-full overflow-hidden rounded-lg p-2 py-1 shadow-[0_0_15px_0_rgba(0,0,0,0.75)]',
				styles.infoBlock,
			)}
		>
			{Object.entries(info).map(([key, value], index) => (
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
