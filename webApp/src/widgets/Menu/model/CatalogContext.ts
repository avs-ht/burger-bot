import { createContext } from 'react';

interface ICatalogContext {
	currCatalog: string;
	changingCatalog: boolean;
	setCurrCatalog: (catalog: string) => void;
	setChangingCatalog: (changing: boolean) => void;
}
export const CatalogContext = createContext<ICatalogContext>({
	currCatalog: 'mainDishes',
	setCurrCatalog: () => {},
	setChangingCatalog: () => {},
	changingCatalog: false,
});
