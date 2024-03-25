import { View } from './View';
import { Events } from './Events';

interface FormProps {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends View<FormProps> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	/**
	 * Initializes a new instance of the class with the provided container element and events.
	 *
	 * @param {HTMLFormElement} container - The container element for the form.
	 * @param {Events} events - The events object for handling form events.
	 */
	constructor(protected container: HTMLFormElement, protected events: Events) {
		super(container);
	}

	/**
	 * A method that is called when the value of a field changes.
	 *
	 * @param {keyof T} field - the field that has changed
	 * @param {string} value - the new value of the field
	 */
	protected onChange(field: keyof T, value: string): void {}

	/**
	 * Sets the validity of the submit button.
	 *
	 * @param {boolean} value - The validity value to set.
	 */
	set valid(value: boolean) {}

	/**
	 * Set the errors value.
	 *
	 * @param {string} value - the new value for errors
	 * @return {void}
	 */
	set errors(value: string) {}

	/**
	 * Render function for updating the state and rendering the container.
	 *
	 * @param {T & FormProps} state - the updated state and form properties
	 * @return {HTMLElement} the rendered container element
	 */
	render(state: T & FormProps) {}
}
