import { Contacts, Delivery, Order as OrderProps } from '../../types';
import { Model } from '../base/Model';
import { Events } from '../base/Events';

interface OrderFormProps extends Contacts, Delivery {}

export class Order extends Model<OrderProps> {
	order: Contacts & Delivery = {
		phone: '',
		email: '',
		address: '',
		payment: 'online',
	};
	total?: number = 0;
	products?: string[] = [];
	formErrors: Partial<Record<keyof OrderProps, string>> = {};

	constructor(events: Events) {
		super(
			{
				products: [],
				total: 0,
			},
			events
		);
	}

	setDeliveryField(
		field: keyof OrderFormProps,
		value: OrderFormProps[keyof OrderFormProps]
	) {}

	setContactsField(
		field: keyof OrderFormProps,
		value: OrderFormProps[keyof OrderFormProps]
	) {}

	validateDelivery() {}

	validateContacts() {}
}
