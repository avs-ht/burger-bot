import { useContext, useEffect, useRef } from 'react';

import { CatalogContext } from '../../model/CatalogContext';
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
	id,
	dsecription,
	menuPositions,
}: Props) => {
	const { setCurrCatalog, currCatalog } = useContext(CatalogContext);

	const ref = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						if (document.body.getAttribute('isMovingToCatalog') === 'true') {
							if (id === currCatalog)
								document.body.setAttribute('isMovingToCatalog', 'false');
							return;
						}
						setCurrCatalog(id);
					}
				});
			},
			{
				rootMargin: '',
				threshold: 0,
			},
		);
		if (ref.current) observer.observe(ref.current);

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			if (ref.current) observer.unobserve(ref.current);
		};
	}, [currCatalog, id, setCurrCatalog]);
	return (
		<div className="relative">
			<i id={id} className="absolute left-0 top-[-60px] h-0 w-0" ref={ref}></i>

			<h3 className="mb-5 text-xl font-bold">{title}</h3>
			<p className="text-menu mb-4 text-sm leading-5">{dsecription}</p>
			<div className="grid gap-5 mini:grid-cols-2">
				{menuPositions.map(menuPosition => (
					<MenuPositionItem key={menuPosition.id} menuPosition={menuPosition} />
				))}
			</div>
		</div>
	);
};
