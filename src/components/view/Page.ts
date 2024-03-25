import { View } from '../base/View';
import { Events } from '../base/Events';

interface PageProps {
	count: number;
	list: HTMLElement[];
	isLock: boolean;
}

export class Page extends View<PageProps> {
	private _counter: HTMLElement;
	private _products: HTMLElement;
	private _wrapper: HTMLElement;
	private _basket: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: Events) {
		super(container);
	}

	/**
	 * Set the count value.
	 *
	 * @param {number} value - The new value for the counter.
	 */
	set count(value: number) {}

	/**
	 * Set the products of the object.
	 *
	 * @param {HTMLElement[]} items - The array of HTMLElement representing the products.
	 */
	set products(items: HTMLElement[]) {}

	/**
	 * Sets the lock value and toggles the 'page__wrapper_locked' class on the wrapper element.
	 *
	 * @param {boolean} value - The new value for the lock.
	 */
	set lock(value: boolean) {}
}
