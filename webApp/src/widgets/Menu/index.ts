import MenuData from './model/menu.json';

export { Menu as default } from './ui/Menu';
export { useCartStore } from './model/CartStore';

export const menuPositions = MenuData.result
	.map(item => item.menuPositions)
	.flat();
