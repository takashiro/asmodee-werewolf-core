import Role from './Role';

interface GameConfig {
	playerNum: number;
	readonly roles: Role[];
}

export default GameConfig;
