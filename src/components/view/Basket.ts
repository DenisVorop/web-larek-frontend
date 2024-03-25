import { View } from '../base/View';
import { Events } from '../base/Events';

interface BasketProps {
	products: HTMLElement[];
	totalAmount: number;
}

export class Basket extends View<BasketProps> {
	protected listElement: HTMLElement;
	protected totalAmountElement: HTMLElement;
	protected buttonElement: HTMLButtonElement;

	/**
	 * Constructor for the class.
	 *
	 * @param {HTMLElement} container - the HTML element to contain the basket
	 * @param {Events} events - the events for the basket
	 */
	constructor(container: HTMLElement, protected events: Events) {
		super(container);
	}

	/**
	 * Sets the products in the basket.
	 *
	 * @param {HTMLElement[]} products - An array of HTMLElement representing the products to be set in the basket.
	 */
	set products(products: HTMLElement[]) {}

	/**
	 * Set the total amount value.
	 *
	 * @param {number} value - The value to set for total amount
	 */
	set totalAmount(value: number) {}
}
