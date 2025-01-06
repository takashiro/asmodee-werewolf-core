import { Period } from '../game/Period.js';
import { Skill } from './Skill.js';

export abstract class NightSkill<OutputType> extends Skill<OutputType> {
	protected lastRun = 0;

	override isAvailable(): boolean {
		return this.driver.getPeriod() === Period.Night && this.lastRun < this.driver.getDay();
	}

	protected setFinished(): void {
		this.lastRun = this.driver.getDay();
	}
}
