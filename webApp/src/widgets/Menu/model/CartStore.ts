import { create } from 'zustand';

import menu from '../model/menu.json';

const positions = menu.result.map(item => item.menuPositions).flat();

interface CartStore {
	cart: Record<string, number>;
	price: number;
	addToCart: (item: string) => void;
	deleteFromCart: (item: string) => void;
}
export const useCartStore = create<CartStore>(set => ({
	cart: {},
	price: 0,

	addToCart: (item: string) => {
		set(state => {
			state.cart[item] = (state.cart[item] || 0) + 1;
			return {
				cart: state.cart,
				price:
					state.price +
					+(positions.find(position => position.id === item)?.price || 0),
			};
		});
	},
	deleteFromCart: (item: string) => {
		set(state => {
			if (!state.cart[item]) {
				console.warn('Trying to delete item from cart that is not in cart');
				return state;
			}
			state.cart[item] = state.cart[item] - 1;
			return {
				cart: state.cart,
				price:
					state.price -
					+(positions.find(position => position.id === item)?.price || 0),
			};
		});
	},
}));
