import { createContext } from 'react';

interface ICatalogContext {
	currCatalog: string;
	setCurrCatalog: (catalog: string) => void;
}
export const CatalogContext = createContext<ICatalogContext>({
	currCatalog: 'mainDishes',
	setCurrCatalog: () => {},
});
