import { EventListener } from './EventListener.js';

/**
 * An event driver to fire events and execute event handlers.
 */
export class EventDriver<EventType> {
	protected listeners = new Map<EventType, EventListener<EventType, unknown>[]>();

	/**
	 * Register an event listener.
	 * @param listener event listener
	 */
	register(listener: EventListener<EventType, unknown>): void {
		const listeners = this.listeners.get(listener.event);
		if (listeners) {
			listeners.push(listener);
		} else {
			this.listeners.set(listener.event, [listener]);
		}
	}

	/**
	 * Fire an event and execute all listeners.
	 * @param event event type
	 * @param data event parameters
	 */
	async trigger<ParamType>(event: EventType, data?: ParamType): Promise<void> {
		const listeners = this.listeners.get(event);
		if (!listeners || listeners.length <= 0) {
			return;
		}
		for (const listener of listeners) {
			await listener.process(data);
		}
	}
}
