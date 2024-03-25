import { View } from '../base/View';
import { Categories, Product } from '../../types';

const categoriesColors: Record<keyof typeof Categories, string> = {
	SOFT: 'card__category_soft',
	OTHER: 'card__category_other',
	ADDITIONAL: 'card__category_additional',
	BUTTON: 'card__category_button',
	HARD: 'card__category_hard',
};

export class Card extends View<Product> {
	protected titleElement: HTMLElement;
	protected priceElement: HTMLElement;
	protected buttonElement?: HTMLButtonElement;
	protected descriptionElement?: HTMLElement;
	protected imageElement?: HTMLImageElement;
	protected categoryElement?: HTMLElement;

	/**
	 * Initializes a new instance of the class with the specified block name, container element, and optional action.
	 *
	 * @param {string} block - The name of the block.
	 * @param {HTMLElement} container - The container element.
	 * @param {{ onClick: (event: MouseEvent) => void }} [action] - The optional action object with an onClick event handler.
	 */
	constructor(
		block: string,
		container: HTMLElement,
		action?: { onClick: (event: MouseEvent) => void }
	) {
		super(container);
	}

	/**
	 * Sets the value of the id property and updates the dataset of the container element.
	 *
	 * @param {string} value - The new value for the id property.
	 */
	set id(value: string) {}

	/**
	 * Returns the ID of the container element as a string.
	 *
	 * @return {string} The ID of the container element, or an empty string if it is not present.
	 */
	get id(): string {}

	/**
	 * Set the title of the element.
	 *
	 * @param {string} value - The new title value.
	 */
	set title(value: string) {}

	/**
	 * Returns the title of the element.
	 *
	 * @return {string} The title of the element.
	 */
	get title(): string {}

	/**
	 * Sets the price of the item and updates the UI accordingly.
	 *
	 * @param {number} value - The new price of the item.
	 */
	set price(value: number) {}

	/**
	 * Set the image source and update the image element with the new source and title.
	 *
	 * @param {string} src - the new source for the image
	 * @return {void}
	 */
	set image(src: string) {}

	/**
	 * Returns the color class name for a given category.
	 *
	 * @param {Categories} category - The category to get the color class name for.
	 * @return {string} The color class name for the given category.
	 */
	private getCategoryColorClassName(category: Categories): string {
		switch (category) {
			case Categories.SOFT:
				return categoriesColors.SOFT;
			case Categories.HARD:
				return categoriesColors.HARD;
			case Categories.ADDITIONAL:
				return categoriesColors.ADDITIONAL;
			case Categories.OTHER:
				return categoriesColors.OTHER;
			case Categories.BUTTON:
				return categoriesColors.BUTTON;
			default:
				return categoriesColors.OTHER;
		}
	}

	/**
	 * Sets the category for the element.
	 *
	 * @param {Categories} category - the category to set
	 * @return {void}
	 */
	set category(category: Categories) {}

	/**
	 * Sets the description of the element.
	 *
	 * @param {string} value - The new description value.
	 */
	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}
}

export class CardPreview extends Card {
	private _isAddedToBasket: boolean;

	/**
	 * A constructor that initializes the class with a block name, container element, and optional onClick action.
	 *
	 * @param {string} block - The name of the block.
	 * @param {HTMLElement} container - The HTML element to contain the block.
	 * @param {Object} action - An optional object containing onClick function.
	 * @return {void}
	 */
	constructor(
		block: string,
		container: HTMLElement,
		action?: { onClick: (event: MouseEvent) => void }
	) {
		super(block, container, action);
	}

	/**
	 * A function that toggles the button status based on the `isAddedToBasket`.
	 *
	 * @param {boolean} status - the current status of the button
	 * @return {void}
	 */
	toggleButtonStatus(status: boolean): void {}

	/**
	 * Returns a boolean indicating whether the current object is added to the basket.
	 *
	 * @return {boolean} The boolean value indicating whether the current object is added to the basket.
	 */
	get isAddedToBasket(): boolean {}

	/**
	 * Set the value of `isAddedToBasket` and update the button status.
	 *
	 * @param {boolean} value - The new value for `isAddedToBasket`
	 */
	set isAddedToBasket(value: boolean) {}

	/**
	 * Renders the given product data and returns the container element.
	 *
	 * @param {Product} data - The product data to be rendered.
	 * @return {HTMLElement} The container element.
	 */
	render(data: Product): HTMLElement {}
}
