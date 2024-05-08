import { CatalogProvider } from '../model/CatalogProvider';

import { Catalog } from './Catalog';
import { MenuContent } from './MenuContent';

export const Menu = () => {
	return (
		<CatalogProvider>
			<Catalog />
			<MenuContent />
		</CatalogProvider>
	);
};
