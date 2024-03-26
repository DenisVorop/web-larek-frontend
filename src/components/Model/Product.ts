import { Product as ProductProps } from '../../types';
import { Model } from '../Base/Model';
import { Events } from '../Base/Events';

export class Product extends Model<ProductProps> {
	constructor(data: ProductProps, events: Events) {
		super(data, events);
	}
}
