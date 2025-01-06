import type { Vision, PlayerProfile } from '@asmodee/werewolf-model';
import { Role, Team } from '@asmodee/werewolf-model';

import { Player } from '../../game/Player.js';
import { NightSkill } from '../NightSkill.js';

export class Seer extends NightSkill<Vision> {
	override getPriority(): number {
		return 0xa0;
	}

	override isFeasible(selected: Player[]): boolean {
		return selected.length === 1 && selected[0].isAlive();
	}

	override async execute(selected: Player[]): Promise<Vision> {
		const players: PlayerProfile[] = selected.map((target) => ({
			seat: target.getSeat(),
			role: target.hasTeamship(Team.Werewolf) ? Role.Werewolf : Role.Villager,
		}));
		this.setFinished();
		return { players };
	}
}
