import { Events } from './Events';

export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: Events) {
		Object.assign(this, data);
	}

	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
