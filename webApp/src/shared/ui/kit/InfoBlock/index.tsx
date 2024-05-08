import clsx from 'clsx';

import styles from './index.module.scss';

interface Props {
	info: Record<string, string | number>;
	title?: string;
	valueColor?: 'blue' | 'green' | 'auto';
}
export const InfoBlock = ({ info, title = '', valueColor = 'blue' }: Props) => {
	return (
		<>
			{title && <h2 className="mb-2 px-2 font-bold">{title}</h2>}
			{document.body.style.getPropertyValue('--tg-theme-bg-color')}
			<div
				className={clsx(
					'w-full overflow-hidden rounded-lg p-2 py-1',
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
								<span
									className={clsx('font-bold', {
										'text-[#40a7e4]': valueColor === 'blue',
									})}
								>
									{value}
								</span>
							</div>
						) : (
							''
						)}
					</>
				))}
			</div>
		</>
	);
};
