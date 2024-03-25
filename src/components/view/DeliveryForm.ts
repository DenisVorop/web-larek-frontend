import { Delivery, PaymentOptions } from '../../types';
import { Form } from '../base/Form';
import { Events } from '../base/Events';

export class DeliveryForm extends Form<Delivery> {
	protected _paymentContainer: HTMLDivElement;
	protected _paymentButtons: HTMLButtonElement[];

	/**
	 * constructor function for initializing the container and events
	 *
	 * @param {HTMLFormElement} container - The container element for the form.
	 * @param {Events} events - The events object for handling form events.
	 */
	constructor(container: HTMLFormElement, events: Events) {
		super(container, events);
	}

	/**
	 * Set the payment method for a given class name by toggling button classes.
	 *
	 * @param {string} className - The name of the class to set as the payment method.
	 * @return {void}
	 */
	setPaymentMethod(className: string) {}

	/**
	 * Set the payment method value.
	 *
	 * @param {string} value - the payment method value to set
	 */
	set payment(value: string) {}

	/**
	 * Setter for the address property.
	 *
	 * @param {PaymentOptions} value - the value to set for the address
	 */
	set address(value: PaymentOptions) {}
}
