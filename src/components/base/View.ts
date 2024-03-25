export abstract class View<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	/**
	 * Toggles the specified class on the given element.
	 *
	 * @param {HTMLElement} element - The element to toggle the class on
	 * @param {string} className - The class name to toggle
	 * @param {boolean} [force] - Force the class to be added or removed
	 */
	toggleClass(element: HTMLElement, className: string, force?: boolean) {}

	/**
	 * Sets the text content of an HTML element.
	 *
	 * @param {HTMLElement} element - The HTML element to set the text content of.
	 * @param {unknown} value - The value to set as the text content.
	 */
	protected setText(element: HTMLElement, value: unknown) {}

	/**
	 * Set the disabled state of the given HTML element.
	 *
	 * @param {HTMLElement} element - the HTML element to modify
	 * @param {boolean} state - the state to set (true for disabled, false for enabled)
	 */
	setDisabled(element: HTMLElement, state: boolean) {}

	/**
	 * Sets the display property of the given element to 'none', effectively hiding it.
	 *
	 * @param {HTMLElement} element - The element to be hidden.
	 */
	protected setHidden(element: HTMLElement) {}

	/**
	 * Sets the visibility of the given element.
	 *
	 * @param {HTMLElement} element - The element to set the visibility of.
	 */
	protected setVisible(element: HTMLElement) {}

	/**
	 * Sets the source and alt text for an HTML image element.
	 *
	 * @param {HTMLImageElement} element - The image element to set the source and alt text for.
	 * @param {string} src - The source URL of the image.
	 * @param {string} [alt] - The alternative text for the image (optional).
	 */
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {}

	/**
	 * Renders the component with optional data and returns the container element.
	 *
	 * @param {T} data - Optional data to assign to the component.
	 * @return {HTMLElement} The container element of the component.
	 */
	render(data?: T): HTMLElement {}
}
