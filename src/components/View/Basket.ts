import { createElement, ensureElement } from '../../utils/utils';
import { View } from '../Base/View';
import { Events } from '../Base/Events';

interface IBasketView {
	products: HTMLElement[];
	totalAmount: number;
}

export class BasketUI extends View<IBasketView> {
	protected listElement: HTMLElement;
	protected totalAmountElement: HTMLElement;
	protected buttonElement: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: Events) {
		super(container);

		this.listElement = ensureElement('.basket__list', this.container);

		this.totalAmountElement = ensureElement('.basket__price', this.container);

		this.buttonElement = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);

		this.buttonElement.addEventListener('click', () => {
			events.emit('order:open');
		});

		this.products = [];
	}

	set products(products: HTMLElement[]) {
		if (products.length) {
			this.listElement.replaceChildren(...products);
			this.setVisible(this.totalAmountElement);
			this.setDisabled(this.buttonElement, false);
			return;
		}

		this.listElement.replaceChildren(
			createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста',
			})
		);
		this.setHidden(this.totalAmountElement);
		this.setDisabled(this.buttonElement, true);
	}

	set totalAmount(value: number) {
		this.setText(this.totalAmountElement, value);
	}
}
