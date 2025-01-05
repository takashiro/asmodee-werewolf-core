import { Period } from '../game/Period.js';
import { Skill } from './Skill.js';

export abstract class NightSkill extends Skill {
	override isAvailable(): boolean {
		return this.driver.getPeriod() === Period.Night;
	}
}
