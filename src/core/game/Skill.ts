import type { EventListener } from '../driver/EventListener.js';

export abstract class Skill<DriverType, PlayerType> {
	protected finished = false;

	constructor(
		protected readonly driver: DriverType,
		protected readonly owner: PlayerType,
		protected priority = 0,
	) {
	}

	/**
	 * @returns Skill owner.
	 */
	getOwner(): PlayerType {
		return this.owner;
	}

	/**
	 * A smaller number means a higher priority.
	 * @returns Skill priority.
	 */
	getPriority(): number {
		return this.priority;
	}

	/**
	 * Whether the skill can be used.
	 */
	abstract isAvailable(): boolean;

	/**
	 * Whether the skill can be used against selected players.
	 * @param selected selected players
	 */
	abstract isFeasible(selected: PlayerType[]): boolean;

	/**
	 * Run the skill against selected players.
	 * @param selected selected players
	 */
	abstract execute(selected: PlayerType[]): Promise<void>;

	/**
	 * @returns A few skill effects triggered on specific events.
	 */
	abstract getEffects(): EventListener<number, unknown>[] | undefined;
}
