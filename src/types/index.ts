export type Payments = 'online' | 'offline' | '';
export type Categories =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface Product {
	id: string;
	title: string;
	description: string;
	image: string;
	category: Categories;
	price: number | null;
	isAddedToBasket?: boolean;
}

export interface Delivery {
	address: string;
	payment: Payments;
}

export interface Contacts {
	phone: string;
	email: string;
}

export interface OrderForm extends Contacts, Delivery {}

export interface Order extends OrderForm {
	total: number;
	items: string[];
}

export interface OrderData {
	id: string;
	total: number;
}
