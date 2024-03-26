import { Contacts } from '../../types';
import { Events } from '../Base/Events';
import { Form } from '../Base/Form';

export class ContactsFormUI extends Form<Contacts> {
	constructor(container: HTMLFormElement, events: Events) {
		super(container, events);

		this.submitElement.addEventListener('click', () => {
			this.events.emit('order.contacts:next');
		});
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	protected onChange(field: keyof Contacts, value: string) {
		this.events.emit('order.contacts:update', {
			field,
			value,
		});
	}
}
