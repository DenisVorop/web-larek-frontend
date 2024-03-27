import { Delivery, Payments } from '../../types';
import { ensureAllElements } from '../../utils/utils';
import { Events } from '../Base/Events';
import { Form } from '../Base/Form';

export class DeliveryFormUI extends Form<Delivery> {
	paymentButtons: HTMLButtonElement[];
	constructor(container: HTMLFormElement, events: Events) {
		super(container, events, 'delivery');

		this.paymentButtons = ensureAllElements(
			'.order__buttons button',
			container
		);

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				this.resetButtonStatus();
				this.toggleClass(button, 'button_alt-active');

				if (event.target instanceof HTMLButtonElement) {
					this.paymentSelection(event.target.name as Payments);
				}
			});
		});
	}

	resetButtonStatus() {
		if (!this.paymentButtons) return;

		this.paymentButtons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', false);
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	paymentSelection(method: Payments) {
		this.events.emit('order.delivery:update', {
			field: 'payment',
			value: method,
		});
	}

	protected onChange(field: keyof Delivery, value: string) {
		this.events.emit('order.delivery:update', {
			field,
			value,
		});
	}
}
