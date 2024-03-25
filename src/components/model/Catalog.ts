import { Product } from '../../types';
import { Model } from '../base/Model';
import { Events } from '../base/Events';

export class Catalog extends Model<Product[]> {
	products: Product[] = [];

	constructor(events: Events) {
		super([], events);
	}

	setProducts(products: Product[]) {}
}
