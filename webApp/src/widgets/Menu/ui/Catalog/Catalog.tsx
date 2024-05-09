import clsx from 'clsx';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useContext, useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';

import { CatalogContext } from '../../model/CatalogContext';

import styles from './Catalog.module.scss';

const CATALOG = {
	'🥘 Основные блюда': 'mainDishes',
	'🍔 Бургеры': 'burgers',
	'🥗 Салаты': 'salats',
	'🍰 Десерты': 'desserts',
};
export const Catalog = () => {
	const isCatalogChanged = useRef(false);
	const { currCatalog, setCurrCatalog } = useContext(CatalogContext);
	useEffect(() => {
		if (!isCatalogChanged.current) return;
		window.requestAnimationFrame(() => {
			const element = document.getElementById(currCatalog);
			if (element)
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		isCatalogChanged.current = false;
	}, [currCatalog]);

	return (
		<OverlayScrollbarsComponent className="fixed left-0 top-0 z-50 w-full">
			<ul
				className={clsx(
					'flex w-full gap-5 overflow-auto px-1 py-3',
					styles.container,
				)}
			>
				{Object.entries(CATALOG).map(catalog => {
					const [catalogName, htmlId] = catalog;
					const isCurrCatalog = htmlId === currCatalog;
					return (
						<InView as="li" key={htmlId}>
							<button
								className={clsx(
									`whitespace-nowrap rounded-2xl bg-transparent px-3 py-2 ${styles.button}`,
									{
										[`${styles.active}`]: isCurrCatalog,
									},
								)}
								disabled={isCurrCatalog}
								onClick={() => {
									isCatalogChanged.current = true;
									setCurrCatalog(htmlId);
									document.body.setAttribute('isMovingToCatalog', 'true');
								}}
							>
								{catalogName}
							</button>
						</InView>
					);
				})}
			</ul>
		</OverlayScrollbarsComponent>
	);
};
