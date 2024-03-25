import { Product } from '../../types';
import { Model } from '../base/Model';
import { Events } from '../base/Events';

export class Basket extends Model<Product[]> {
	protected products: Product[] = [];

	constructor(events: Events) {
		super([], events);
	}

	getProducts(): Product[] {}

	changeProducts() {}

	addProduct(product: Product) {}

	removeProduct(product: Product) {}

	clear() {}

	getTotalAmount() {}

	getProductIds(): string[] {}

	makeOrder(): void {}
}
