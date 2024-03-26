import { Order, Product, OrderData } from '../types';
import { Api, ApiListResponse } from './Base/Api';

interface ProductApi {
	cdn: string;
	getProducts: () => Promise<Product[]>;
	getProduct: (id: string) => Promise<Product>;
	createOrder: (order: Order) => Promise<OrderData>;
}

export class ClientApi extends Api implements ProductApi {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<Product[]> {
		return this.get(`/product/`).then((data: ApiListResponse<Product>) => {
			return data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}));
		});
	}

	getProduct(id: string): Promise<Product> {
		return this.get(`/lot/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	createOrder(order: Order): Promise<OrderData> {
		return this.post('/order', order).then((data: OrderData) => data);
	}
}
