import type { Player } from '../game/Player.js';

export interface DeathEvent {
	victim: Player;
	reason: string;
}
