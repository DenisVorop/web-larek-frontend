export enum Categories {
	SOFT = 'софт-скил',
	OTHER = 'другое',
	ADDITIONAL = 'дополнительное',
	BUTTON = 'кнопка',
	HARD = 'хард-скил',
}

export interface Product {
	id: string;
	title: string;
	description: string;
	image: string;
	category: Categories;
	price: number | null;
}

export type PaymentOptions = 'online' | 'offline';

export interface Delivery {
	address: string;
	payment: PaymentOptions;
}

export interface Contacts {
	phone: string;
	email: string;
}

export interface Order {
	total: number;
	products: string[];
}
