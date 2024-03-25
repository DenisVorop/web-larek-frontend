import { Product } from '../../types';
import { Events } from '../base/Events';
import { Model } from '../base/Model';

export class Basket extends Model<Product[]> {
	protected productList: Product[] = [];

	constructor(events: Events) {
		super([], events);
	}

	getProducts(): Product[] {
		return this.productList;
	}

	changeProductList(): void {
		this.events.emit('basket:update', this.productList);
	}

	clear(): void {
		this.productList = [];
	}

	removeProduct(product: Product): void {
		const productId = product.id;
		this.productList = this.productList.filter((product) => {
			return product.id !== productId;
		});
		this.changeProductList();
	}

	addProduct(product: Product): void {
		const productIndex = this.productList.findIndex((p) => p.id === product.id);
		if (productIndex === -1) {
			this.productList.push(product);
		}
		this.changeProductList();
	}

	getTotalAmount() {
		return this.productList.reduce((totalAmount, product) => {
			return totalAmount + product.price;
		}, 0);
	}

	getProductIds(): string[] {
		return this.productList.map((product) => product.id);
	}

	makeOrder(): void {
		if (this.productList.length > 0) {
			this.emitChanges('basket:order');
		}
	}
}
