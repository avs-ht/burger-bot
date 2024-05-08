import clsx from 'clsx';

import { MenuPosition as MenuPositionType } from '../../model/MenuPosition';

import styles from './MenuPositionItem.module.scss';

export const MenuPositionItem = ({
	menuPosition,
}: {
	menuPosition: MenuPositionType;
}) => {
	return (
		<div className={clsx('rounded-3xl rounded-t-[100px]', styles.item)}>
			<img
				className="aspect-video w-full rounded-t-3xl"
				src={menuPosition.image}
				alt={menuPosition.description}
			/>
			<div className="p-3 pb-0">
				<h4 className="mb-3 font-bold">
					{menuPosition.title.length > 30
						? menuPosition.title.slice(0, 27) + '...'
						: menuPosition.title}
				</h4>
				<p className="mb-3">
					{menuPosition.description?.length || 0 > 40
						? menuPosition.description?.slice(0, 37) + '...'
						: menuPosition.description}
				</p>
				<button className="w-full rounded-xl bg-app-green py-3 text-white">{`${(+menuPosition.price).toFixed(0)} ₽`}</button>
			</div>
		</div>
	);
};
