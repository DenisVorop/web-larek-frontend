import { OrderData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export class SuccessUI extends View<OrderData> {
	closeButton: HTMLButtonElement;
	descriptionElement: HTMLElement;

	constructor(container: HTMLElement, { onClick }: { onClick: () => void }) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);

		this.descriptionElement = ensureElement(
			'.order-success__description',
			this.container
		);

		if (!onClick) return;

		this.closeButton.addEventListener('click', onClick);
	}
	set total(value: number) {
		this.setText(this.descriptionElement, `Списано ${value} синапсов`);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}
}
