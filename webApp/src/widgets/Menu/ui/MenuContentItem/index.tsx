import { useInView } from 'react-intersection-observer';

import { MenuPosition } from '../../model/MenuPosition';

import { MenuPositionItem } from './MenuPositionItem';

interface Props {
	title: string;
	id: string;
	dsecription: string;
	menuPositions: MenuPosition[];
}

export const MenuContentItem = ({
	title,
	dsecription,
	menuPositions,
}: Props) => {
	const { ref, inView } = useInView({
		/* Optional options */
		threshold: 0,
	});
	if (inView) {
		console.log(1);
	}
	return (
		<div className="">
			<h3 ref={ref}>{title}</h3>
			<p>{dsecription}</p>
			<div className="">
				{menuPositions.map(menuPosition => (
					<MenuPositionItem key={menuPosition.id} menuPosition={menuPosition} />
				))}
			</div>
		</div>
	);
};
