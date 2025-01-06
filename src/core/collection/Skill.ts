import type { Board } from '../game/Board.js';
import type { Player } from '../game/Player.js';
import { Skill as BaseSkill } from '../game/Skill.js';
import { SkillEffect } from './SkillEffect.js';

export abstract class Skill<OutputType> extends BaseSkill<Board, Player, OutputType> {
	override getEffects(): SkillEffect<unknown>[] | undefined {
		return undefined;
	}
}
