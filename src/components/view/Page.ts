import { ensureElement } from '../../utils/utils';
import { View } from '../base/View';
import { Events } from '../base/Events';

interface PageProps {
	products: HTMLElement[];
	count: number;
	lock: boolean;
}

export class PageUI extends View<PageProps> {
	protected counterElement: HTMLElement;
	protected buttonElement: HTMLButtonElement;
	protected catalogElement: HTMLElement;
	protected wrapperElement: HTMLElement;

	constructor(container: HTMLElement, protected events: Events) {
		super(container);

		this.catalogElement = ensureElement('.gallery', this.container);
		this.wrapperElement = ensureElement('.page__wrapper', this.container);

		this.counterElement = ensureElement(
			'.header__basket-counter',
			this.container
		);

		this.buttonElement = ensureElement<HTMLButtonElement>(
			'.header__basket',
			this.container
		);

		this.buttonElement.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set products(products: HTMLElement[]) {
		this.catalogElement.replaceChildren(...products);
	}

	set count(value: number) {
		this.setText(this.counterElement, value);
	}

	set lock(value: boolean) {
		if (value) {
			this.wrapperElement.classList.add('page__wrapper_locked');
			return;
		}

		this.wrapperElement.classList.remove('page__wrapper_locked');
	}
}
