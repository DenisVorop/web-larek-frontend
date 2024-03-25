import { View } from '../base/View';

interface SuccessProps {
	total: number;
}

export class Success extends View<SuccessProps> {
	closeButton: HTMLButtonElement;
	descriptionElement: HTMLElement;

	/**
	 * Initializes a new instance of the class with the specified container element and success action.
	 *
	 * @param {HTMLElement} container - The container element for the success component.
	 * @param {ISuccessAction} action - The success action to be performed when the close button is clicked.
	 */
	constructor(container: HTMLElement, action: { onClick: () => void }) {
		super(container);
	}

	/**
	 * Set the total value and update the description element.
	 *
	 * @param {number} value - the value to set
	 * @return {void}
	 */
	set total(value: number) {}
}
