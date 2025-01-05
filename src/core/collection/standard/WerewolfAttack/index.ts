import type { Player } from '../../../game/Player.js';
import { NightSkill } from '../../NightSkill.js';
import { WerewolfAttacked } from '../constants.js';
import { WerewolfAttackEffect } from './WerewolfAttackEffect.js';

export class WerewolfAttack extends NightSkill {
	isFeasible(selected: Player[]): boolean {
		return selected.length === 1;
	}

	override isAvailable(): boolean {
		return super.isAvailable() && !this.driver.getProperty(WerewolfAttacked);
	}

	override async execute([target]: Player[]): Promise<void> {
		if (target) {
			this.driver.setProperty(WerewolfAttacked, target.getSeat());
		}
	}

	override getEffects(): WerewolfAttackEffect[] {
		return [
			new WerewolfAttackEffect(this.driver),
		];
	}
}

export default WerewolfAttack;
