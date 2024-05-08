import clsx from 'clsx';
import { useContext } from 'react';

import { CatalogContext } from '../model/CatalogContext';

import styles from './Catalog.module.scss';

const CATALOG = {
	'🥘 Основные блюда': 'mainDishes',
	'🍔 Бургеры': 'burgers',
	'🥗 Салаты': 'salats',
	'🍰 Десерты': 'desserts',
};
export const Catalog = () => {
	const { currCatalog, setCurrCatalog } = useContext(CatalogContext);
	const activeItemClass = 'bg-app-green text-white';
	return (
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
					<li
						key={htmlId}
						className={clsx('whitespace-nowrap rounded-2xl px-3 py-2', {
							[activeItemClass]: isCurrCatalog,
						})}
					>
						<button
							disabled={isCurrCatalog}
							onClick={() => {
								console.log(setCurrCatalog(htmlId));
							}}
						>
							{catalogName}
						</button>
					</li>
				);
			})}
		</ul>
	);
};
