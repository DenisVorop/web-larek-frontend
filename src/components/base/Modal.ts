import { View } from './View';
import { Events } from './Events';

interface ModalProps {
	content: HTMLElement;
}

export class Modal extends View<ModalProps> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	/**
	 * Constructor for initializing the modal.
	 *
	 * @param {HTMLElement} container - The container element for the modal
	 * @param {Events} events - The events object for handling events
	 */
	constructor(container: HTMLElement, protected events: Events) {
		super(container);
	}

	/**
	 * Set the content of the element.
	 *
	 * @param {HTMLElement} value - the new content to be set
	 */
	set content(value: HTMLElement) {}

	/**
	 * opens the modal by adding `modal_active` class to the container element
	 */
	open() {}

	/**
	 * Closes the modal by removing the `modal_active` class from the container,
	 * clearing the content, and emitting an event.
	 */
	close() {}

	/**
	 * Renders the modal with the provided data and returns the container element.
	 *
	 * @param {ModalProps} data - The data to be rendered in the modal.
	 * @return {HTMLElement} The container element of the modal.
	 */
	render(data: ModalProps): HTMLElement {}
}
