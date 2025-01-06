import { Mark } from '@asmodee/werewolf-model';
import { Event } from '../../../event/Event.js';
import { Board } from '../../../game/Board.js';
import { SkillEffect } from '../../SkillEffect.js';

export class WerewolfAttackEffect extends SkillEffect<void> {
	constructor(board: Board) {
		super(Event.BeforeSunrise, board);
	}

	async process(): Promise<void> {
		const victims = this.board.findPlayers((player) => player.isAlive() && player.hasMark(Mark.WerewolfAttacked));
		for (const victim of victims) {
			await this.board.killPlayer(victim, Mark.WerewolfAttacked);
			victim.removeMark(Mark.WerewolfAttacked);
		}
	}
}
