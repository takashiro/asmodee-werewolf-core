import { Role } from './Role.js';

export interface GameConfig {
	playerNum: number;
	readonly roles: Role[];
}
