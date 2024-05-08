import { useState } from 'react';

import { CatalogContext } from './CatalogContext';

export const CatalogProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [catalog, setCatalog] = useState('mainDishes');
	return (
		<CatalogContext.Provider
			value={{
				currCatalog: catalog,
				setCurrCatalog: catalog => setCatalog(catalog),
			}}
		>
			{children}
		</CatalogContext.Provider>
	);
};
