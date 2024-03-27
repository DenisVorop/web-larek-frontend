export abstract class View<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		if (!element) return;

		element.classList.toggle(className, force);
	}

	protected setText(element: Element, value: unknown) {
		if (!element) return;

		element.textContent = String(value);
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (!element) return;

		if (state) {
			element.setAttribute('disabled', 'disabled');
			return;
		}

		element.removeAttribute('disabled');
	}

	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (!element) return;
		element.src = src;

		if (!alt) return;
		element.alt = alt;
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this, data ?? {});
		return this.container;
	}
}
