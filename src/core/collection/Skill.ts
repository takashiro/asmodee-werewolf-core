import type { Board } from '../game/Board.js';
import type { Player } from '../game/Player.js';
import { Skill as BaseSkill } from '../game/Skill.js';
import { SkillEffect } from './SkillEffect.js';

export abstract class Skill extends BaseSkill<Board, Player> {
	override getEffects(): SkillEffect<unknown>[] | undefined {
		return undefined;
	}
}
