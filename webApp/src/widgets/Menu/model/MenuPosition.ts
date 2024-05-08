export interface MenuPosition {
	image: string;
	title: string;
	id: string;
	description?: string;
	price: number | string;
	isSpicy?: boolean;
	isChefChoice?: boolean;
	isMonthDish?: boolean;
	isFromChef?: boolean;
	isNewDish?: boolean;
}
