import { CatalogProvider } from '../model/CatalogProvider';

import { Catalog } from './Catalog/Catalog';
import { MenuContent } from './MenuContent';

export const Menu = () => {
	return (
		<CatalogProvider>
			<Catalog />
			<div className="mt-4 pt-[57px]">
				<MenuContent />
			</div>
		</CatalogProvider>
	);
};
