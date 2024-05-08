import { useState } from 'react';

import { CatalogContext } from './CatalogContext';

export const CatalogProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [catalog, setCatalog] = useState('mainDishes');
	const [isChanging, setChanging] = useState(false);
	return (
		<CatalogContext.Provider
			value={{
				currCatalog: catalog,
				setCurrCatalog: catalog => setCatalog(catalog),
				changingCatalog: isChanging,
				setChangingCatalog: changing => setChanging(changing),
			}}
		>
			{children}
		</CatalogContext.Provider>
	);
};
