import { Contacts } from '../../types';
import { Form } from '../base/Form';
import { Events } from '../base/Events';

export class ContactsForm extends Form<Contacts> {
	/**
	 * Constructor for the class.
	 *
	 * @param {HTMLElement} container - the HTML element to contain the basket
	 * @param {Events} events - the events for the basket
	 */
	constructor(container: HTMLFormElement, events: Events) {
		super(container, events);
	}

	/**
	 * Sets the value of the phone input field to the specified value.
	 *
	 * @param {string} value - The value to set the phone input field to.
	 */
	set phone(value: string) {}

	/**
	 * Set the email value in the container element
	 *
	 * @param {string} value - the email value to set
	 */
	set email(value: string) {}
}
