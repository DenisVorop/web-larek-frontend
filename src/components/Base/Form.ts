import { View } from './View';
import { Events } from './Events';
import { ensureElement } from '../../utils/utils';

interface FormProps {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends View<FormProps> {
	protected submitElement: HTMLButtonElement;
	protected errorsElement: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: Events) {
		super(container);

		this.submitElement = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errorsElement = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:update`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.submitElement.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.errorsElement, value);
	}

	render(state: Partial<T> & FormProps) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
