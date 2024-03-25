import { View } from '../base/View';
import { Product, Categories } from '../../types';
import { ensureElement } from '../../utils/utils';

const categoriesColors = {
	SOFT: 'card__category_soft',
	OTHER: 'card__category_other',
	ADDITIONAL: 'card__category_additional',
	BUTTON: 'card__category_button',
	HARD: 'card__category_hard',
} as const;

export class CardUI extends View<Product> {
	protected titleElement: HTMLElement;
	protected priceElement: HTMLElement;
	protected buttonElement?: HTMLButtonElement;
	protected descriptionElement?: HTMLElement;
	protected imageElement?: HTMLImageElement;
	protected categoryElement?: HTMLElement;

	constructor(
		block: string,
		container: HTMLElement,
		action?: { onClick: (event: MouseEvent) => void }
	) {
		super(container);

		this.titleElement = ensureElement(`.${block}__title`, container);

		this.priceElement = ensureElement(`.${block}__price`, container);

		this.descriptionElement = container.querySelector(`.${block}__text`);
		this.imageElement = container.querySelector(`.${block}__image`);
		this.categoryElement = container.querySelector(`.${block}__category`);
		this.buttonElement = container.querySelector(`.${block}__button`);

		if (!action?.onClick) return;

		if (this.buttonElement) {
			this.buttonElement.addEventListener('click', action.onClick);
			return;
		}

		this.container.addEventListener('click', action.onClick);
	}
	set id(value: string) {
		this.container.dataset.id = value;
	}
	get id(): string {
		return this.container.dataset.id;
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}
	get title(): string {
		return this.titleElement.textContent;
	}
	set price(value: number) {
		if (value) {
			this.setText(this.priceElement, `${value} синапсов`);
			return;
		}

		this.setText(this.priceElement, 'Бесценно');
		this.setDisabled(this.buttonElement, true);
	}
	set image(src: string) {
		this.setImage(this.imageElement, src, this.title);
	}
	getCategoryColorClassName(category: Categories): string {
		switch (category) {
			case 'софт-скил':
				return categoriesColors.SOFT;
			case 'хард-скил':
				return categoriesColors.HARD;
			case 'дополнительное':
				return categoriesColors.ADDITIONAL;
			case 'другое':
				return categoriesColors.OTHER;
			case 'кнопка':
				return categoriesColors.BUTTON;
			default:
				return categoriesColors.OTHER;
		}
	}

	set category(category: Categories) {
		console.log(this.categoryElement);
		this.toggleClass(
			this.categoryElement,
			this.getCategoryColorClassName(category)
		);
		this.setText(this.categoryElement, category);
	}
	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}
}

export class CardPreviewUI extends CardUI {
	private _isAddedToBasket: boolean;

	constructor(
		block: string,
		container: HTMLElement,
		action?: {
			onClick: (event: MouseEvent) => void;
		}
	) {
		super(block, container, action);

		if (!this.buttonElement) return;

		this.buttonElement.addEventListener('click', () => {
			this.isAddedToBasket = !this.isAddedToBasket;
		});
	}

	toggleButtonStatus(status: boolean): void {
		this.setText(
			this.buttonElement,
			status ? 'Убрать из корзины' : 'В корзину'
		);
	}

	get isAddedToBasket(): boolean {
		return this._isAddedToBasket;
	}

	set isAddedToBasket(value: boolean) {
		this.toggleButtonStatus(value);
		this._isAddedToBasket = value;
	}

	render(data: Product): HTMLElement {
		super.render(data);
		return this.container;
	}
}
