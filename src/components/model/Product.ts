import { Product as ProductProps } from '../../types';
import { Model } from '../base/Model';
import { Events } from '../base/Events';

export class Product extends Model<ProductProps> {
	constructor(data: ProductProps, events: Events) {
		super(data, events);
	}
}
