import { MenuPosition } from '../../model/MenuPosition';

import { MenuPositionItem } from './MenuPositionItem';

interface Props {
	title: string;
	dsecription: string;
	menuPositions: MenuPosition[];
}

export const MenuContentItem = ({
	title,
	dsecription,
	menuPositions,
}: Props) => {
	return (
		<div className="">
			<h3>{title}</h3>
			<p>{dsecription}</p>
			{menuPositions.map(menuPosition => (
				<MenuPositionItem key={menuPosition.id} menuPosition={menuPosition} />
			))}
		</div>
	);
};
