import type { Mark } from '@asmodee/werewolf-model';
import type { Player } from '../game/Player.js';

export interface DeathEvent {
	victim: Player;
	reason: Mark;
}
