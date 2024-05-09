import { useCartStore } from '$/widgets/Menu';
import { CartList } from './CartList';
import { EmptyCart } from './EmptyCart';

export const Cart = () => {
	const price = useCartStore(state => state.price);
	return <>{price > 0 ? <CartList /> : <EmptyCart />}</>;
};
