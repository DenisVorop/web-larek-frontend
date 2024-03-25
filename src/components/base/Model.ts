import { Events } from './Events';

export abstract class Model<T> {
	/**
	 * Initializes a new instance of the class with the provided data and events.
	 *
	 * @param {T} data - The data to assign to the instance.
	 * @param {Events} events - The events to be used by the instance.
	 */
	constructor(data: T, protected events: Events) {}

	/**
	 * Emits an event with an optional payload.
	 *
	 * @param {string} event - The name of the event to emit.
	 * @param {object} payload - Optional. The payload to include with the event.
	 */
	emitChanges(event: string, payload?: object) {}
}
