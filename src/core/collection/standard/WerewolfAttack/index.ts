import { Mark } from '@asmodee/werewolf-model';
import type { Player } from '../../../game/Player.js';
import { NightSkill } from '../../NightSkill.js';
import { WerewolfAttackEffect } from './WerewolfAttackEffect.js';

export class WerewolfAttack extends NightSkill<void> {
	isFeasible(selected: Player[]): boolean {
		return selected.length === 1 && selected[0].isAlive();
	}

	override isAvailable(): boolean {
		return super.isAvailable() && !this.driver.getProperty(Mark.WerewolfAttacked);
	}

	override async execute([target]: Player[]): Promise<void> {
		if (target) {
			this.driver.setProperty(Mark.WerewolfAttacked, target.getSeat());
			target.addMark(Mark.WerewolfAttacked);
		}
		this.setFinished();
	}

	override getEffects(): WerewolfAttackEffect[] {
		return [
			new WerewolfAttackEffect(this.driver),
		];
	}
}

export default WerewolfAttack;
