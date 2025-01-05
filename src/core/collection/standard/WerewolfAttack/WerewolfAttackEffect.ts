import { Event } from '../../../event/Event.js';
import { Board } from '../../../game/Board.js';
import { SkillEffect } from '../../SkillEffect.js';
import { WerewolfAttacked } from '../constants.js';

export class WerewolfAttackEffect extends SkillEffect<void> {
	constructor(board: Board) {
		super(Event.BeforeSunrise, board);
	}

	async process(): Promise<void> {
		const seat = this.board.getProperty(WerewolfAttacked) as number;
		const victim = this.board.getPlayer(seat);
		if (victim) {
			await this.board.killPlayer(victim, WerewolfAttacked);
		}
	}
}
