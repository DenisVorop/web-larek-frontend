import { Product } from '../../types';
import { Events } from '../base/Events';
import { Model } from '../base/Model';

export class Catalog extends Model<Product[]> {
	catalogList: Product[] = [];

	constructor(events: Events) {
		super([], events);
	}

	setProducts(products: Product[]) {
		this.catalogList = products.map((product) => ({
			...product,
			isAddedToBasket: false,
		}));
		this.emitChanges('catalog:updated', { products: this.catalogList });
	}
}
