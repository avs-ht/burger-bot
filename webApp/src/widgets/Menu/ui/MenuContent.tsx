import { MenuPosition } from '../model/MenuPosition';
import menu from '../model/menu.json';

import { MenuContentItem } from './MenuContentItem';

export const MenuContent = () => {
	return (
		<div className="flex flex-col gap-10">
			{menu.result.map(({ title, description, menuPositions, id }) => (
				<MenuContentItem
					id={id}
					key={id}
					title={title}
					dsecription={description}
					menuPositions={menuPositions as MenuPosition[]}
				/>
			))}
		</div>
	);
};
