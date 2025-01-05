import { Board } from '../game/Board.js';
import { Event } from '../event/Event.js';
import { EventListener } from '../driver/EventListener.js';

export abstract class SkillEffect<ParamType> extends EventListener<Event, ParamType> {
	constructor(
		event: Event,
		protected readonly board: Board,
	) {
		super(event);
	}
}
