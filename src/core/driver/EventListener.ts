export abstract class EventListener<EventType, ParamType> {
	readonly event: EventType;

	constructor(event: EventType) {
		this.event = event;
	}

	/**
	 * Run the event handler.
	 * @param param event data
	 */
	abstract process(param: ParamType): Promise<void>;
}

export default EventListener;
