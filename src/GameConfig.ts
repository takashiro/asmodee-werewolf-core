import Role from './Role.js';

interface GameConfig {
	playerNum: number;
	readonly roles: Role[];
}

export default GameConfig;
