import { Order as OrderProps, OrderForm, Payments } from '../../types';
import { Events } from '../base/Events';
import { Model } from '../base/Model';

export class Order extends Model<OrderProps> {
	order: OrderForm = {
		phone: '',
		email: '',
		address: '',
		payment: 'online',
	};
	total?: number = 0;
	productsIds?: string[] = [];
	formErrors: Partial<Record<keyof OrderProps, string>> = {};

	constructor(events: Events) {
		super({}, events);
	}

	setDeliveryField(field: keyof OrderForm, value: OrderForm[keyof OrderForm]) {
		if (field === 'payment') {
			this.order[field] = value as Payments;
		}
		if (field === 'address') {
			this.order[field] = value;
		}

		if (this.validateDelivery()) {
			this.events.emit('order.delivery:ready', this.order);
		}
	}
	setContactsField(field: keyof OrderForm, value: OrderForm[keyof OrderForm]) {
		if (field !== 'payment') {
			this.order[field] = value;
		}

		if (this.validateContacts()) {
			this.events.emit('order.contacts:ready', this.order);
		}
	}

	validateDelivery() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:delivery:update', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		if (!this.order.email) {
			errors.email = 'Необходимо указать адрес электронной почты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:contacts:update', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
